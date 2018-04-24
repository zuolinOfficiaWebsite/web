angular.module('ng.zl').directive('zlScroll', function ($zl, $mdMedia) {
    'use strict';
    return {
        restrict: 'A',
        replace: true,
        scope: {},
        templateUrl: 'views/scroll.html',
        controller: function ($scope, $element) {

            var params = $element.attr('zl-scroll');
            if (params.indexOf('scroll-top') > -1) {
                $scope.top = true;
            }
            if (params.indexOf('scroll-bottom') > -1) {
                $scope.bottom = true;
            }

            $scope.onTop = function () {
                $zl.scroll.top();
            };

            $scope.onBottom = function () {
                $zl.scroll.bottom();
            };

            $scope.isShow = $mdMedia('gt-md');
        }
    };
});