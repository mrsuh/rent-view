"use strict";

var config = require(__dirname + '/../config.js');
var client = require('mongodb').MongoClient;

module.exports = {
    db: null,
    subways: {},

    init: function() {
        client.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.database, function (err, db) {
            console.info('connect to mongodb');
            if (err) {
                console.error('connect to mongodb');
                process.exit(1);
            }

            this.db = db;

            this.findSubways(function(subways){
                this.subways = subways;
            }.bind(this))

        }.bind(this));
    },

    findDocuments: function (filter, options, callback) {

        var collection = this.db.collection('note');

        collection.find(filter).sort(options.order).skip(options.skip).limit(options.limit).toArray(function (err, docs) {
            callback(docs);
        }.bind(this));
    },

    findDocumentsWithoutLimit: function (filter, callback) {

        var collection = this.db.collection('note');

        collection.find(filter).toArray(function (err, docs) {
            callback(docs);
        }.bind(this));
    },

    findDocument: function (filter, callback) {

        var collection = this.db.collection('note');

        collection.findOne(filter, function (err, doc) {
            callback(doc);
        }.bind(this));
    },

    findSubways: function (callback) {

        var collection = this.db.collection('subway');

        collection.find({}).toArray(function (err, docs) {

            var _subways = {};
            for (var i = 0, length = docs.length; i < length; i++) {
                _subways[docs[i]._id] = docs[i];
            }

            callback(_subways);
        }.bind(this));
    }
};