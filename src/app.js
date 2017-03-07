"use strict";

var http = require('http');
var repo = require(__dirname + '/services/repo.js');
var config = require(__dirname + '/config.js');
var pagination = require(__dirname + '/services/pagination.js');
var format = require(__dirname + '/services/format.js');
var url = require(__dirname + '/services/url.js');
var template = require(__dirname + '/services/template.js');

repo.init();
template.init();

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

    if (params.realty && params.realty === 'room') {
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

    filter['active'] = true;

    return filter;
};

var server = http.createServer(function (req, res) {

    res.writeHead(200, {
        'Content-Type': 'text/html; charset=UTF-8'
    });

    switch (true) {
        case null !== req.url.match(/\/about.*/i):

            res.end(template.about());

            break;
        case null !== req.url.match(/\/rent\/.*/i):

            var reg = req.url.match(/\/rent\/.*p\.(.*)/i);
            var id = reg[1];

            repo.findNote({_id: id, active: true}, function (doc) {

                doc['timestamp'] = format.date(doc['timestamp']);
                doc['price'] = format.number(doc['price']);

                var phones = doc['contacts']['phones'];
                var new_phones = [];
                for (var p = 0, plength = phones.length; p < plength; p++) {
                    new_phones.push(format.phone(phones[p]));
                }

                doc['contacts']['phones'] = new_phones;

                res.end(template.page({
                    item: doc,
                    subways: repo.subways
                }));
            });

            break;
        default:

            var req_price_from = url.getParameter(req.url, 'price_from');
            var price_from = null !== req_price_from ? parseInt(req_price_from) : '';

            var req_price_to = url.getParameter(req.url, 'price_to');
            var price_to = null !== req_price_to ? parseInt(req_price_to) : '';

            var req_area_from = url.getParameter(req.url, 'area_from');
            var area_from = null !== req_area_from ? parseInt(req_area_from) : '';

            var req_area_to = url.getParameter(req.url, 'area_to');
            var area_to = null !== req_area_to ? parseInt(req_area_to) : '';

            var req_realty = url.getParameter(req.url, 'realty');
            var realty = null !== req_realty ? req_realty : 'flat';

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
                photo: photo
            });

            var subway_name = null;
            var subway_names = [];

            for (var i = 0, length = subway.length; i < length; i++) {
                var subway_id = subway[i];
                if (typeof repo.subways[subway_id] === 'undefined') {
                    continue;
                }
                subway_names.push(repo.subways[subway_id].name);
            }

            switch (subway_names.length) {
                case 0:
                    subway_name = 'Метро';
                    break;
                case 1:
                    subway_name = 'м. ' + subway_names[0];
                    break;
                default:
                    subway_name = 'м. ' + subway_names[0] + ', ...';
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
                limit: 10
            };

            repo.findNotesByOptions(filter, options, function (docs) {
                repo.findNotes(filter, function (unlimit_docs) {

                    for (var i = 0, length = docs.length; i < length; i++) {
                        var timestamp = docs[i]['timestamp'];
                        var price = docs[i]['price'];

                        docs[i]['timestamp'] = format.datePlural(timestamp);
                        docs[i]['price'] = format.number(price);

                        var phones = docs[i]['contacts']['phones'];
                        var new_phones = [];
                        for (var p = 0, plength = phones.length; p < plength; p++) {
                            new_phones.push(format.phone(phones[p]));
                        }

                        docs[i]['contacts']['phones'] = new_phones;
                    }

                    res.end(template.list({
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
                            page: page
                        },
                        subway_name: subway_name,
                        items_count: unlimit_docs.length,
                        items: docs,
                        subways: repo.subways,
                        pagination: pagination.paginate(page, Math.ceil(unlimit_docs.length / items_on_page))
                    }));
                });
            });

            break;
    }
});

// Запускаем web-сервер
server.listen(config.server.port, config.server.host, function () {
    console.log('server run');
});