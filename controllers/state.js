app.controller('state', function ($scope, $timeout, $filter,sharedData) {
	var name=sharedData.getName();
	$scope.header=name.name;
	console.log(name);
	$scope.ok="OK";	
	var asciiToHex = function(ascii){
		return ascii.charCodeAt(0).toString(16);
	}
	
	var hexToascii = function(hex){
		return String.fromCharCode(parseInt(n, 16));
	}
	
	
	$scope.m = [];
	$scope.process = function(){
		$scope.m = [];
		m = $scope.message.split('');
		for(i=0;i<$scope.message.length;i++){
			$scope.m.push({ascii:m[i],hex:asciiToHex(m[i])});
		}
		sharedData.setMessage($scope.m); 
	}
	
	console.log($scope.m);
	

});
