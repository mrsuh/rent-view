"use strict";

var client = require('mongodb').MongoClient;

module.exports = {
    db: null,
    subways: {},
    cities: {},

    /**
     *
     * @param config
     */
    init: function (config) {
        this.connect(config).then(function(db){
            this.db = db;

            this.findSubways().then(function(subways){
                var _subways = {};
                for (var i = 0, length = subways.length; i < length; i++) {
                    _subways[subways[i]._id] = subways[i];
                }
                this.subways = _subways;
            }.bind(this));

            this.findCities().then(function(cities){
                var _cities = {};
                for (var i = 0, length = cities.length; i < length; i++) {
                    _cities[cities[i].short_name] = cities[i];
                }
                this.cities = _cities;
            }.bind(this));

        }.bind(this));
    },

    /**
     *
     * @param config
     * @returns {Promise}
     */
    connect: function (config) {
        return new Promise(function (resolve, reject) {

            client.connect('mongodb://' + config.host + ':' + config.port + '/' + config.database, function (err, db) {
                if (err) {
                    console.error('connect to mongodb error');
                    process.exit(1);
                }

                resolve(db);

            }.bind(this));
        }.bind(this));
    },

    /**
     *
     * @param filter
     * @param options
     * @returns {Promise}
     */
    findNotesByOptions: function (filter, options) {
        return new Promise(function (resolve, reject) {
            this.db.collection('note').find(filter).sort(options.order).skip(options.skip).limit(options.limit).toArray(function (err, docs) {
                resolve(docs);
            }.bind(this));
        }.bind(this));
    },

    /**
     *
     * @param filter
     * @returns {Promise}
     */
    findNotes: function (filter) {
        return new Promise(function (resolve, reject) {
            this.db.collection('note').find(filter).toArray(function (err, docs) {
                resolve(docs);
            }.bind(this));
        }.bind(this));
    },

    /**
     *
     * @param filter
     * @returns {Promise}
     */
    findSubways: function (filter) {
        return new Promise(function (resolve, reject) {
            this.db.collection('subway').find(filter).toArray(function (err, docs) {
                resolve(docs);
            }.bind(this));
        }.bind(this));
    },

    /**
     *
     * @param filter
     * @returns {Promise}
     */
    findNote: function (filter) {
        return new Promise(function (resolve, reject) {
            this.db.collection('note').findOne(filter, function (err, doc) {
                resolve(doc);
            }.bind(this));
        }.bind(this));
    },

    /**
     *
     * @param filter
     * @returns {Promise}
     */
    findCities: function (filter) {
        return new Promise(function (resolve, reject) {
            this.db.collection('city').find(filter).toArray(function (err, docs) {
                resolve(docs);
            }.bind(this));
        }.bind(this));
    }
};