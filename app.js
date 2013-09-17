var app = angular.module('CRYPTO', ['ui.bootstrap']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.
	when('/state', {templateUrl: 'views/state.html',   controller: 'state'}).
	when('/key', {templateUrl: 'views/key.html',   controller: 'key'}).
	when('/diffusion', {templateUrl: 'views/diffusion.html',   controller: 'diffusion'}).
	when('/key', {templateUrl: 'views/key.html',   controller: 'key'}).
	otherwise({redirectTo: '/state'});
	//$locationProvider.html5Mode(true);
}]);
