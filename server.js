var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var movies = [];

function writeFile(){
	fs.writeFile('movies.json', JSON.stringify(movies), (err) => {
		if (err) throw err;
	});
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/client'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

fs.readFile('movies.json', 'utf8', (err, data) => {
	movies = JSON.parse(data);
});

app.get('/api/movies', (req, res) => {
	res.send(movies).end();
});

app.post('/api/savemovie', (req, res) => {
	movies.push(req.body);
	writeFile();
	res.send(movies).end();
});

app.delete('/api/removemovie', function(req, res) {
	console.log(req.query);
	for (var i = 0; i < movies.length; i++){
		if (req.query.title === movies[i].title){
			movies.splice(i, 1);
		}
	}
	writeFile();
	res.send(movies).end();
});

app.get('/api/searchmovie/:title', (req, res) => {
	console.log('searching', req.params);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log(`App listening on port ${port}...`);
});
