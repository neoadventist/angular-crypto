app.controller('message', function ($scope, $timeout, $filter) {
	$scope.header="Message!!";
	
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

	}
	
	console.log($scope.m);
	

});
