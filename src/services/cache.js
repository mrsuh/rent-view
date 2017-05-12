"use strict";

var redis = require("redis");

module.exports = {
    client: null,

    init: function () {
        this.client = redis.createClient();

        this.client.on("error", function (err) {
            console.error("Error " + err);
        });
    },

    set: function (key, data, expire) {
        this.client.set(key, data, 'EX', expire);

        return true;
    },
    get: function (key) {
        return new Promise(function (resolve, reject) {
            this.client.get(key, function (err, reply) {
                resolve(reply);
            }.bind(this));
        }.bind(this));
    }
};