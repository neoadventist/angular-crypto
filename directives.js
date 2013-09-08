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

app.directive('asciihexTable', function() {
    return {
		scope: {
			p: '='
        },
        controller: function ($scope, $element, $attrs, $location) {

        },
        replace: true,
		restrict: 'E',
		link: function(scope, element, attrs) {

		},
		template: '<div><div ng-repeat="i in p"><div ascii-hex ascii="i.ascii" hex="i.hex" /><div></div></div>'
    }
});

app.directive('hexGrid', function() {
    return {
		scope: {
			hexobj: '='
        },
        controller: function ($scope, $element, $attrs, $location) {

        },
        replace: true,
		restrict: 'E',
		link: function(scope, element, attrs) {
			scope.$watch('hexobj',function(){
				blockmessage = [];
				count =0;
				for(i=0;i<4;i++){
					row = [];
					for(k=0;k<4;k++){
						//if the letter does not exist then don't add it to the row, but place a dummy value in its place
						row[k]= typeof scope.hexobj[count] =="undefined" ?  {ascii:"undefined",hex:"00"} : scope.hexobj[count] ; 
						count++;
					}
					blockmessage[i]=row;
				}
				//transpose
				scope.grid = [];
				for(m=0;m<4;m++){
					scope.grid[m] = [];
					for(n=0;n<4;n++){
						scope.grid[m][n]=blockmessage[n][m];	
					}				
				}
			},true);
		},
		templateUrl: 'views/directives/hex-grid.html'
    }
});



