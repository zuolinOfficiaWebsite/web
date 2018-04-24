angular.module('ng.zl').factory('$zlFocusOn', function ($rootScope, $timeout) {
    'use strict';
    return function (name) {
        return $timeout(function () {
            return $rootScope.$broadcast('zlFocusOn', name);
        });
    };
});