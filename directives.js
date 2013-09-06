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
			scope.translate = function(oldletter,newletter){
				for(i=0;i<scope.message.length;i++){
					if(scope.message[i].original==oldletter){
						scope.message[i].translated=newletter;
					}
				}
			}
		},
		templateUrl: 'views/directives/translate.html'
    }
});
