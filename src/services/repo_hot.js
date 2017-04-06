"use strict";

var config = require(__dirname + '/../../config/config.js');
var client = require('mongodb').MongoClient;

module.exports = {
    db: null,
    subways: {},

    init: function () {
        this.connect().then(function(db){
            this.db = db;

            this.findSubways().then(function(subways){
                var _subways = {};
                for (var i = 0, length = subways.length; i < length; i++) {
                    _subways[subways[i]._id] = subways[i];
                }
                this.subways = _subways;
            }.bind(this));
        }.bind(this));
    },

    connect: function () {
        return new Promise(function (resolve, reject) {

            var conf = config.db.hot;

            client.connect('mongodb://' + conf.host + ':' + conf.port + '/' + conf.database, function (err, db) {
                if (err) {
                    console.error('connect to mongodb error');
                    process.exit(1);
                }

                resolve(db);

            }.bind(this));
        }.bind(this));
    },

    findNotesByOptions: function (filter, options) {
        return new Promise(function (resolve, reject) {
            this.db.collection('note').find(filter).sort(options.order).skip(options.skip).limit(options.limit).toArray(function (err, docs) {
                resolve(docs);
            }.bind(this));
        }.bind(this));
    },

    findNotes: function (filter) {
        return new Promise(function (resolve, reject) {
            this.db.collection('note').find(filter).toArray(function (err, docs) {
                resolve(docs);
            }.bind(this));
        }.bind(this));
    },

    findSubways: function (filter) {
        return new Promise(function (resolve, reject) {
            this.db.collection('subway').find(filter).toArray(function (err, docs) {
                resolve(docs);
            }.bind(this));
        }.bind(this));
    },

    findNote: function (filter, callback) {
        return new Promise(function (resolve, reject) {
            this.db.collection('note').findOne(filter, function (err, doc) {
                resolve(doc);
            }.bind(this));
        }.bind(this));
    }
};