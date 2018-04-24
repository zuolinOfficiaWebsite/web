angular.module('ng.zl').directive('zlDyCompile', function ($compile) {
    'use strict';
    return {
        replace: true,
        restrict: 'A',
        link: function (scope, elm, attrs) {
            var DUMMY_SCOPE = {
                    $destroy: angular.noop
                },
                root = elm,
                childScope,
                destroyChildScope = function () {
                    (childScope || DUMMY_SCOPE).$destroy();
                };

            attrs.$observe('html', function (html) {
                if (html) {
                    destroyChildScope();
                    childScope = scope.$new(true);
                    var content = $compile(html)(scope);
                    root.replaceWith(content);
                    root = content;
                }

                scope.$on('$destroy', destroyChildScope);
            });
        }
    };
});
