"use strict";

var client = require('mongodb').MongoClient;

module.exports = {
    db: null,
    subways: {},
    cities: {},
    realties: {komnata: 1, kvartira: 1},

    /**
     *
     * @param databaseUrl
     */
    init: function (databaseUrl) {
        this.connect(databaseUrl).then(function (db) {
            this.db = db;

            this.findSubways().then(function (subways) {
                var _subways = {};
                for (var i = 0, length = subways.length; i < length; i++) {
                    _subways[subways[i]._id] = subways[i];
                }
                this.subways = _subways;
                console.log('Initialized subways', {'subways': Object.keys(_subways).length});
            }.bind(this));

            this.findCities().then(function (cities) {
                var _cities = {};
                for (var i = 0, length = cities.length; i < length; i++) {
                    _cities[cities[i].short_name] = cities[i];
                }
                this.cities = _cities;
                console.log('Initialized cities', {'cities': Object.keys(_cities).length});
            }.bind(this));

        }.bind(this));
    },

    /**
     *
     * @param databaseUrl
     * @returns {Promise}
     */
    connect: function (databaseUrl) {
        return new Promise(function (resolve, reject) {

            client.connect(databaseUrl, function (err, db) {
                if (err) {
                    console.error('connect to mongodb error', err);
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
    },

    /**
     *
     * @param filter
     * @returns {Promise}
     */
    findPublishRecords: function (filter) {
        return new Promise(function (resolve, reject) {
            this.db.collection('publish_record').find(filter).toArray(function (err, docs) {
                resolve(docs);
            }.bind(this));
        }.bind(this));
    }
};