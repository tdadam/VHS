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
	this.movies = [
		{
			title: 'Movie Title 1',
			year: 1988,
			checkedOut: false
		}
	];
}

MainCtrl.prototype.sayHi = function() {
	console.log(this.greeting);
};

MainCtrl.prototype.checkOut = function(movie) {
	console.log('checkout', movie);
};

MainCtrl.prototype.removeMovie = function(movie) {
	console.log('remove', movie);
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
	}
};

MainCtrl.prototype.saveMovie = function(title, year) {
	console.log('save movie', title, year);
};
