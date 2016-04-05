//All
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//JSON
var fs = require('fs');
//Mongo
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

//All
var movies = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/client'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

////JSON db
//function writeFile() {
//    fs.writeFile('movies.json', JSON.stringify(movies), (err) => {
//        if (err) throw err;
//    });
//}

//fs.readFile('movies.json', 'utf8', (err, data) => {
//	movies = JSON.parse(data);
//});
//
//app.get('/api/movies', (req, res) => {
//	res.send(movies).end();
//});
//
//app.post('/api/savemovie', (req, res) => {
//	movies.push(req.body);
//	writeFile();
//	res.send(movies).end();
//});
//
//app.delete('/api/removemovie', function(req, res) {
//	console.log(req.query);
//	for (var i = 0; i < movies.length; i++){
//		if (req.query.title === movies[i].title){
//			movies.splice(i, 1);
//		}
//	}
//	writeFile();
//	res.send(movies).end();
//});
//
//app.get('/api/searchmovie/:title', (req, res) => {
//	console.log('searching', req.params);
//});
//
//var port = process.env.PORT || 3000;
//app.listen(port, function() {
//	console.log(`App listening on port ${port}...`);
//});

//Mongo:
var url = 'mongodb://localhost:27017/matc';

app.get('/api/movies', (req, res) => {
    res.send(movies).end();
});

app.get('/api/searchmovie/:title', (req, res) => {
    console.log('searching', req.params);
});

var insertDocument = function (db, movie, callback) {
    db.collection('movies').insertOne(movie, function (err, result) {
        assert.equal(err, null);
        console.log("Inserted a document into the restaurants collection.");
        callback();
    });
};

app.post('/api/savemovie', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        insertDocument(db, req.body, function () {
                findMovies(db, function () {
                    res.send(movies).end();
                    db.close();
                })
            }
        );
    });
});

function findMovies(db, callback) {
    movies = [];
    var cursor = db.collection('movies').find();
    cursor.each(function (err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            movies.push(doc)
        } else {
            callback();
        }
    });
}

MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected to mongo");

    findMovies(db, function () {
        db.close();
    });

    //db.close();
});

app.get('/api/movies', (req, res) => {
    res.send(movies).end();
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`App listening on port ${port}...`);
});