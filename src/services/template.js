"use strict";

var dot = require('dot');
var fs = require('fs');

/**
 *
 * @param file
 * @param callback
 */
var readFile = function (file, callback) {

    fs.readFile(file, function (err, data) {
        if (err) {
            return console.error(err);
        }

        callback(data.toString());
    });
};

module.exports = {
    list: null,
    page: null,
    about: null,
    sitemap: null,
    statistic: null,

    init: function () {
        readFile(__dirname + '/../view/dist/about/index.html', function (text) {
            this.about = dot.template(text);
        }.bind(this));

        readFile(__dirname + '/../view/dist/main/index.html', function (text) {
            this.list = dot.template(text);
        }.bind(this));

        readFile(__dirname + '/../view/dist/page/index.html', function (text) {
            this.page = dot.template(text);
        }.bind(this));

        readFile(__dirname + '/../view/dist/sitemap/index.html', function (text) {
            this.sitemap = dot.template(text);
        }.bind(this));

        readFile(__dirname + '/../view/dist/statistic/index.html', function (text) {
            this.statistic = dot.template(text);
        }.bind(this));
    }
};