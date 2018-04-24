angular.module('ng.zl.pick').directive('zlRegionPick', function ($zlPickService) {
    'use strict';

    // 有点复杂，不写注释了

    return {
        restrict: 'A',
        replace: true,
        scope: {
            regionParent: '=',
            ngModel: '=',
            pickChips: '='
        },
        templateUrl: 'views/region.pick.html',
        controller: function ($scope, $attrs) {
            $scope.pickChips = $scope.pickChips || false;

            // 传引用过去
            $scope.pick = {
                ngModel: $scope.pickChips ? [] : null
            };

            $scope.$watch('pick.ngModel', function(newValue){
                $scope.ngModel = newValue;
            });

            $scope.needRegionParent = $attrs.regionParent !== undefined;
            $scope.name = $attrs.zlRegionPick;

            var api = '';
            if ($scope.name === 'province') {
                api = 'getProvinceByWord';
            } else if ($scope.name === 'city') {
                api = 'getCityByWord';
            } else if ($scope.name === 'area') {
                api = 'getAreaByWord';
            }

            $scope.querySearch = function (searchText) {
                return $zlPickService[api]({
                    parentId: $scope.regionParent && $scope.regionParent.id || null,
                    keyword: searchText
                }).then(function (data) {
                    if ($scope.pickChips) {
                        return _.filter(data, function (value) {
                            return !isExist(value, $scope.pick.ngModel);
                        });
                    }
                    return data;
                });
            };

            function isExist(item, items) {
                var result = false;
                _.each(items, function (value) {
                    if (value.id === item.id) {
                        result = true;
                    }
                });
                return result;
            }
        }
    };
});
