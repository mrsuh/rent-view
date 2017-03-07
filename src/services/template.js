"use strict";

var dot = require('dot');
var fs = require('fs');

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

    init: function () {
        readFile(__dirname + '/../view/about/index.html', function (text) {
            this.about = dot.template(text);
        }.bind(this));

        readFile(__dirname + '/../view/main/index.html', function (text) {
            this.list = dot.template(text);
        }.bind(this));

        readFile(__dirname + '/../view/page/index.html', function (text) {
            this.page = dot.template(text);
        }.bind(this));
    }
};