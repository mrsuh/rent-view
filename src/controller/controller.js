"use strict";

var db_cold = require(__dirname + '/../db/db.js');
var db_hot = require(__dirname + '/../db/db.js');
var pagination = require(__dirname + '/../services/pagination.js');
var format = require(__dirname + '/../services/format.js');
var url = require(__dirname + '/../services/url.js');
var template = require(__dirname + '/../services/template.js');
var statistic = require(__dirname + '/../services/statistic.js');
var config = require(__dirname + '/../../config/config.js');

db_cold.init(config.db.cold);
db_hot.init(config.db.hot);
template.init();

/**
 *
 * @param params
 * @returns {{}}
 */
var formFilter = function (params) {
    var filter = {
        type: 0
    };

    if (params.price_from || params.price_to) {
        filter['price'] = {};
    }

    if (params.price_from) {
        filter['price']['$gte'] = parseInt(params.price_from)
    }

    if (params.price_to) {
        filter['price']['$lte'] = parseInt(params.price_to)
    }

    if (params.city) {
        filter['city'] = params.city;
    }

    if (params.area_from || params.area_to) {
        filter['area'] = {};
    }

    if (params.area_from) {
        filter['area']['$gte'] = parseInt(params.area_from)
    }

    if (params.area_to) {
        filter['area']['$lte'] = parseInt(params.area_to)
    }

    if (params.photo) {
        filter['photos'] = {
            '$not': {'$size': 0}
        };
    }

    if (params.subway && params.subway.length) {

        var subway_ids = [];
        for (var i = 0, length = params.subway.length; i < length; i++) {
            subway_ids.push(parseInt(params.subway[i]));
        }

        filter['subways'] = {
            '$in': subway_ids
        };
    }

    if (params.realty && 'komnata' === params.realty) {
        filter['type'] = 0;
    } else if (params.realty_add.length) {
        var realty_ids = [];
        for (var i = 0, length = params.realty_add.length; i < length; i++) {
            realty_ids.push(parseInt(params.realty_add[i]));
        }
        filter['type'] = {'$in': realty_ids};
    } else {
        filter['type'] = {'$ne': 0};
    }

    return filter;
};

/**
 *
 * @param req
 * @param res
 */
var aboutController = function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=UTF-8'
    });

    return res.end(template.about({
        page: 'about',
        req: {
            city: 'sankt-peterburg',
            realty: 'kvartira'
        }
    }));
};


/**
 *
 * @param req
 * @param res
 */
var notFoundController = function (req, res) {
    res.writeHead(404, {
        'Content-Type': 'text/html; charset=UTF-8'
    });

    return res.end(template.not_found({
        page: '404'
    }));
};

/**
 *
 * @param req
 * @param res
 */
var statisticController = function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=UTF-8'
    });

    var all_hot = db_hot.findNotes({});
    var all_cold = db_cold.findNotes({});

    Promise.all([all_hot, all_cold]).then(function (result) {
        var notes_hot = result[0];
        var notes = result[0].concat(result[1]);

        return res.end(template.statistic({
            days: statistic.days(notes_hot),
            hours: statistic.hours(notes),
            ratio: statistic.ratio(notes),
            subways: statistic.subways(notes, db_hot.subways),
            check_subways: statistic.checkSubways(notes),
            check_area: statistic.checkArea(notes),
            check_price: statistic.checkPrice(notes),
            check_phone: statistic.checkPhone(notes),
            page: 'statistic'
        }));
    });
};

/**
 *
 * @param req
 * @param res
 */
var sitemapController = function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=UTF-8'
    });

    db_hot.findNotes({})
        .then(function (notes) {
            for (var i = 0, length = notes.length; i < length; i++) {
                notes[i]['timestamp'] = format.dateSitemap(notes[i]['timestamp']);
            }

            return res.end(template.sitemap({notes: notes}));
        });
};

/**
 *
 * @param req
 * @param res
 */
var noteController = function (req, res) {
    var reg = req.url.match(/\/rent\/.*p\.(.*)/i);
    var id = reg[1];

    var drow = function (doc, req, res) {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8'
        });

        doc['timestamp'] = format.date(doc['timestamp']);
        doc['price'] = format.number(doc['price']);

        var phones = doc['contact']['phones'];
        var new_phones = [];
        for (var p = 0, plength = phones.length; p < plength; p++) {
            new_phones.push(format.phone(phones[p]));
        }

        doc['contact']['phones'] = new_phones;

        return res.end(template.page({
            item: doc,
            subways: db_hot.subways,
            page: 'advert'
        }));
    };

    db_hot.findNote({_id: id})
        .then(function (doc_hot) {
            if (null === doc_hot) {

                db_cold.findNote({_id: id}).then(function (doc_cold) {

                    if (null === doc_cold) {
                        res.writeHead(302, {'Location': '/'});
                        return res.end();
                    }

                    return drow(doc_cold, req, res);
                });
            }

            return drow(doc_hot, req, res);
        });
};

/**
 *
 * @param req
 * @param res
 */
var listController = function (req, res) {

    var regexp = /^\/([^\/]+)\/(kvartira|komnata)(\??).*/i;
    var match = regexp.exec(req.url);

    var city = match[1] ? match[1] : 'sankt-peterburg';
    var realty = match[2] ? match[2] : 'kvartira';

    res.setHeader('X-City', city);
    res.setHeader('X-Realty', realty);

    res.writeHead(200, {
        'Content-Type': 'text/html; charset=UTF-8'
    });

    var req_price_from = url.getParameter(req.url, 'price_from');
    var price_from = null !== req_price_from ? parseInt(req_price_from) : '';

    var req_price_to = url.getParameter(req.url, 'price_to');
    var price_to = null !== req_price_to ? parseInt(req_price_to) : '';

    var req_area_from = url.getParameter(req.url, 'area_from');
    var area_from = null !== req_area_from ? parseInt(req_area_from) : '';

    var req_area_to = url.getParameter(req.url, 'area_to');
    var area_to = null !== req_area_to ? parseInt(req_area_to) : '';

    var req_order = url.getParameter(req.url, 'order');
    var order = null !== req_order ? req_order : 'date';

    var req_photo = url.getParameter(req.url, 'photo');
    var photo = null !== req_photo ? req_photo : false;

    var req_page = url.getParameter(req.url, 'page');
    var page = null !== req_page ? req_page : 1;

    var req_realty_add = url.getParameter(req.url, 'realty_add');
    var realty_add = null !== req_realty_add ? req_realty_add.split(',') : [];

    var req_subway = url.getParameter(req.url, 'subway');
    var subway = null !== req_subway ? req_subway.split(',') : [];

    var filter = formFilter({
        price_from: price_from,
        price_to: price_to,
        area_from: area_from,
        area_to: area_to,
        realty: realty,
        realty_add: realty_add,
        subway: subway,
        photo: photo,
        city: city
    });

    var subway_name = 'Метро';
    if (subway.length) {
        for (var i = 0, length = subway.length; i < length; i++) {
            var subway_id = subway[i];

            if (typeof db_hot.subways[subway_id] !== 'undefined') {
                subway_name = 'м. ' + db_hot.subways[subway_id].name.substr(0, 5) + '...';
                break;
            }
        }
    }

    var filter_order = {};

    if (order === 'date') {
        filter_order['timestamp'] = -1;
    } else {
        filter_order['price'] = 1;
    }

    var items_on_page = 10;

    var options = {
        order: filter_order,
        skip: items_on_page * (page - 1),
        limit: items_on_page
    };

    var find_by_options = db_hot.findNotesByOptions(filter, options);
    var find_all = db_hot.findNotes(filter);

    Promise.all([find_by_options, find_all]).then(function (result) {

        var docs = result[0];
        var unlimit_docs = result[1];

        for (var i = 0, length = docs.length; i < length; i++) {
            var timestamp = docs[i]['timestamp'];
            var price = docs[i]['price'];

            docs[i]['timestamp'] = format.datePlural(timestamp);
            docs[i]['price'] = format.number(price);

            var phones = docs[i]['contact']['phones'];
            var new_phones = [];
            for (var p = 0, plength = phones.length; p < plength; p++) {
                new_phones.push(format.phone(phones[p]));
            }

            docs[i]['contact']['phones'] = new_phones;
        }

        return res.end(template.list({
            req: {
                price_from: price_from,
                price_to: price_to,
                area_from: area_from,
                area_to: area_to,
                realty: realty,
                order: order,
                realty_add: realty_add,
                subway: subway,
                photo: photo,
                page: page,
                city: city
            },
            subway_name: subway_name,
            items_count: unlimit_docs.length,
            items: docs,
            subways: db_hot.subways,
            pagination: pagination.paginate(page, Math.ceil(unlimit_docs.length / items_on_page)),
            page: 'advert'
        }));
    });
};

module.exports = {
    about: aboutController,
    statistic: statisticController,
    sitemap: sitemapController,
    note: noteController,
    list: listController,
    not_found: notFoundController
};