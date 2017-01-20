// Загружаем модуль http
var http = require('http');
var dot = require('dot');
var fs = require('fs');

var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var myDb;
var collection_docs;
var tmp_text;
var template;

/**
 * will reuse connection if already created
 */
function connect(callback) {
    if (myDb === undefined) {

        MongoClient.connect('mongodb://127.0.0.1:27017/rent-storage', function (err, db) {
            console.info('connect to mongodb');
            if (err) {
                return callback(err)
            };

            myDb = db;
            callback(null, db);
        });
    } else {
        callback(null, myDb);
    }
}

var findDocuments = function(db, filter, callback) {
    // Get the documents collection
    var collection = db.collection('note');
    // Find some documents

    collection.find(filter).sort({timestamp: -1}).limit(10).toArray(function(err, docs) {
        assert.equal(err, null);
        // console.log("Found the following records");
         console.log('mongo find');
        collection_docs = docs;
        callback(docs);
    });
};


var readFile = function(file, callback) {

    if(tmp_text !== undefined) {
        return callback(tmp_text);
    }

    fs.readFile(file, function (err, data) {
        if (err) {
            return console.error(err);
        }

        callback(data.toString());
    });
};

readFile(__dirname + '/page/index.html', function(text){
    template = dot.template(text);
});

// Создаем web-сервер с обработчиком запросов
var server = http.createServer(function (req, res) {
    // console.log('Начало обработки запроса');
    // Передаем код ответа и http-заголовки
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=UTF-8'
    });

    console.info(req.url);

    connect(function(err, db){
        if (err) { return console.log('mongo db connection error!'); }
        var filter = {
            type: 0
        };
       findDocuments(db, filter, function(docs){

           res.end(template({
               price_from: '',
               price_to: '',
               area_from: '',
               area_to: '',
               realty: 'room',
               order: 'date',
               count_items: docs.length,
               array: docs
           }));
       })
    });
});

// Запускаем web-сервер
server.listen(2000, "127.0.0.1", function () {
    console.log('Сервер запущен http://127.0.0.1:2000/');
});