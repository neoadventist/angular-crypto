app.controller('message', function ($scope, $timeout, $filter) {
	$scope.header="Message!!";
	
	var asciiToHex = function(ascii){
		hex = ascii.charCodeAt(0).toString(16);
	
		return hex;
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
