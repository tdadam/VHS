var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var movies = [
	{
		title: 'Movie Title 1',
		year: 1988,
		checkedOut: true
	},
	{
		title: 'Movie Title 2',
		year: 1989,
		checkedOut: false
	}
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/client'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.get('/api/movies', (req, res) => {
	res.json(movies).end();
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log(`App listening on port ${port}...`);
});
