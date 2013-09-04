app.controller('message', function ($scope, $timeout, $filter) {
	$scope.header="Message!!";
	$scope.m = [];
	$scope.process = function(){
		$scope.m = [];
		m = $scope.message.split('');
		for(i=0;i<$scope.message.length;i++){
			$scope.m.push({original:m[i],translated:""});
		}

	}
	
	console.log($scope.m);
	
});
