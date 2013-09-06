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
			var oneToOne = function(test,m){
				var match=false;
				var count=0;
				for(n=0;n<m.length;n++){
					console.log(m[n].translated);
					if(test==m[n].translated){
						count++;
					}
				}
				if(count>=2){ 
					//count is two beacuse the copied letter is automatically entered into the object via angular binding. 
					match=true;
				}
				return match; 
			}
			scope.translate = function(oldletter,newletter){
			console.log(scope.message);
				for(i=0;i<scope.message.length;i++){
					if(!oneToOne(newletter,scope.message)){
						if(scope.message[i].original==oldletter){
							scope.message[i].translated=newletter;
						}
					}else{
						if(scope.message[i].original==oldletter){
							scope.message[i].translated=''; //find the angular binded value and set it equal to nothing.  
						}
					}
				}
			}
			
		},
		templateUrl: 'views/directives/translate.html'
    }
});
