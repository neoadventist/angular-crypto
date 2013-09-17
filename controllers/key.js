app.controller('key', function ($scope, $timeout, $filter) {
		$scope.header="Key!";
        var asciiToHex = function(ascii){
                return ascii.charCodeAt(0).toString(16);
        }

        var hexToascii = function(hex){
                return String.fromCharCode(parseInt(n, 16));
        }


        $scope.k = [];
        $scope.process = function(){
                $scope.k = [];
                m = $scope.keyPlaintext.split('');
                for(i=0;i<m.length;i++){
                        $scope.k.push({ascii:m[i],hex:asciiToHex(m[i])});
                }

        }
});
