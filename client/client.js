angular.module('app', ['ngMaterial'])

	.component('main', {
		templateUrl: 'main.html',
		controller: MainCtrl,
		bindings: {
		}
	});

function MainCtrl($http) {
	this.$http = $http;
	this.greeting = 'VHS Store';
	this.$http.get('/api/movies').then(response => {
		console.log('api movies', response.data);
		this.movies = response.data;
	});
	this.searchText = '';
}

MainCtrl.prototype.sayHi = function() {
	console.log(this.greeting);
};

/**
 * Used for both checking out a movie and checking in.
 * The server will need to check the "checkedOut" property of the movie.
 */
MainCtrl.prototype.checkOut = function(movie) {
	console.log('checkout', movie);
	this.$http.post('/api/checkout', movie).then(response => {
		console.log('checked out movie');
		this.search(this.searchText);
	}).catch(error => {
		console.log('movie already checked out');
		this.search(this.searchText);
	});
};

MainCtrl.prototype.removeMovie = function(movie) {
	this.$http.delete('/api/removemovie?title=' + movie.title).then(response => {
		this.movies = response.data;
	});
};

MainCtrl.prototype.search = function(text) {
	if (text === undefined || text === '') {
		console.log('list all movies');
		this.$http.get('/api/movies').then(response => {
			console.log('api movies', response.data);
			this.movies = response.data;
		});
	} else {
		console.log('search for movies:', text);
		this.$http.get(`/api/searchmovie/${text}`).then(response => {
			this.movies = response.data;
		});
	}
};

MainCtrl.prototype.saveMovie = function(title, year) {
	console.log('save movie', title, year);

	this.$http.post('/api/savemovie', {
		title: title,
		year: year,
		checkedOut: false
	}).then(response => {
		console.log('saved movie', response);
		this.search('');
	});
};
