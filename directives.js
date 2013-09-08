app.directive('transLation', function() {
    return {
		scope: {
			letter: '=',
			message: '='
        },
        controller: function ($scope, $element, $attrs, $location) {

        },
        replace: true,
		restrict: 'A',
		link: function(scope, element, attrs) {
			//tests to see if every letter is unique
			var oneToOne = function(orig,test,m){
				var match=false;
				var count=0;
				var occurance =0;
				for(n=0;n<m.length;n++){
					console.log(m[n].translated);
					if(test==m[n].translated){
						count++;
					}
					if(orig==m[n].original){
						occurance++;
					}
				}
				if(count>=occurance && count>1){ 
					//count is two beacuse the copied letter is automatically entered into the object via angular binding. 
					match=true;
				}
				return match; 
			}
			scope.translate = function(oldletter,newletter){
			console.log(scope.message);
				for(i=0;i<scope.message.length;i++){
					if(!oneToOne(oldletter,newletter,scope.message)){
						if(scope.message[i].original==oldletter){
							scope.message[i].translated=newletter;
						}
					}else{
						if(scope.message[i].original==oldletter){
							scope.message[i].translated=undefined; //find the angular binded value and set it equal to nothing.  
						}
					}
				}
			}
			
		},
		templateUrl: 'views/directives/translate.html'
    }
});
app.directive('asciiHex', function() {
    return {
		scope: {
			ascii: '=',
			hex: '='
        },
        controller: function ($scope, $element, $attrs, $location) {

        },
        replace: true,
		restrict: 'A',
		link: function(scope, element, attrs) {
				
		},
		templateUrl: 'views/directives/ascii-hex.html'
    }
});

app.directive('hexGrid', function() {
    return {
		scope: {
			message: '='
        },
        controller: function ($scope, $element, $attrs, $location) {

        },
        replace: true,
		restrict: 'E',
		link: function(scope, element, attrs) {
			scope.grid = [];
			count =0;
			for(i=0;i<4;i++){
				row = [];
				for(k=0;k<4;k++){
				row[k]=scope.message[count];
				count++;
				}
				scope.grid[i]=row;
			}
				console.log(scope.grid);
		},
		templateUrl: 'views/directives/hex-grid.html'
    }
});



