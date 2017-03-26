"use strict";

var http = require('http');
var controller = require(__dirname + '/services/controller.js');
var config = require(__dirname + '/../config/config.js');

var server = http.createServer(function (req, res) {

    res.writeHead(200, {
        'Content-Type': 'text/html; charset=UTF-8'
    });

    switch (true) {
        case null !== req.url.match(/\/about.*/i):
            return controller.about(req, res);
            break;
        case null !== req.url.match(/\/sitemap.xml.*/i):
            return controller.sitemap(req, res);
            break;
        case null !== req.url.match(/\/rent\/.*/i):
            return controller.note(req, res);
            break;
        case null !== req.url.match(/\/statistic.*/i):
            return controller.statistic(req, res);
            break;
        default:
            return controller.list(req, res);
            break;
    }
});

server.listen(config.server.port, config.server.host, function () {
    console.log('server run');
});