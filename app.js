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
app.factory('sharedData',['$http', function($http) {
        var data = {name:"Default Name",message:[],key:[]};
        send= function(){
                $http({
                        url: "data/get.php",
                        method: "POST",
                        data: fetch
                }).success(function(DATA, status, headers, config) {
                        data = DATA;
                        return data;
                }).error(function(DATA, status, headers, config) {
                        //$scope.status = status;
                });
        }
        var userdata = {};
    return {
        getName: function() {
            return data;
        },
	setMessage: function(msg){
		data.message=msg;
	},
	getMessage: function(){
		return data.message; 
	},
	setKey: function(key){
		data.key=key; 
	},
	getKey: function(){
		return data.key; 
	}
    }
}]);
            
