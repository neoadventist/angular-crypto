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
		template: '<div><span style="display:inline; font-size:32px; font-weight:bold;">{{letter.original}}</span><span style="display:inline; font-size:32px; font-weight:bold;">&#8596;</span><input ng-model="letter.translated" style="top: -7px; position: relative; display:inline; font-size:32px; font-weight:bold; border: 0px solid #000000; width:30px;" ng-change="translate(letter.original,letter.translated)" maxlength="1" /></div>'
    }
});
