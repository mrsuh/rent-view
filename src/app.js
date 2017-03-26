"use strict";

var http = require('http');
var controller = require(__dirname + '/services/controller.js');
var config = require(__dirname + '/../config/config.js');

var server = http.createServer(function (req, res) {

    switch (true) {
        case null !== req.url.match(/\/about.*/i):
            controller.about(req, res);
            break;
        case null !== req.url.match(/\/sitemap.xml.*/i):
            controller.sitemap(req, res);
            break;
        case null !== req.url.match(/\/rent\/.*/i):
            controller.note(req, res);
            break;
        case null !== req.url.match(/\/statistic.*/i):
            controller.statistic(req, res);
            break;
        default:
            controller.list(req, res);
            break;
    }
});

server.listen(config.server.port, config.server.host, function () {
    console.log('server run');
});