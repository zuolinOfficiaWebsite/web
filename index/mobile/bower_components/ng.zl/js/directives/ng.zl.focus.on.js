angular.module('ng.zl').directive('zlFocusOn', function () {
    'use strict';
    return function (scope, elem, attr) {
        return scope.$on('zlFocusOn', function (e, name) {
            if (name === attr.zlFocusOn) {
                return elem[0].focus();
            }
        });
    };
});