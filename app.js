var app = angular.module('CRYPTO', ['ui.bootstrap']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.
	when('/message', {templateUrl: 'views/message.html',   controller: 'message'}).
	when('/confusion', {templateUrl: 'views/confusion.html',   controller: 'confusion'}).
	when('/diffusion', {templateUrl: 'views/diffusion.html',   controller: 'diffusion'}).
	when('/key', {templateUrl: 'views/key.html',   controller: 'key'}).
	otherwise({redirectTo: '/message'});
	//$locationProvider.html5Mode(true);
}]);