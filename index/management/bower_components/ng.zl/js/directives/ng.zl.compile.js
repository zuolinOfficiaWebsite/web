angular.module('ng.zl').directive('zlCompile', function ($compile) {
    'use strict';
    return {
        replace: true,
        restrict: 'A',
        link: function (scope, elm, attrs) {
            if(attrs.html){
                var dom = $compile(attrs.html)(scope);
                elm.replaceWith(dom);
            }
        }
    };
});
