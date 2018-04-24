angular.module('myApp', ['ng.zl', 'ng.zl.grid', 'ng.zl.uploader', 'ng.zl.pick']).controller('DemoController', function ($scope, $q) {
    'use strict';

    $scope.province = null;
    $scope.city = null;
    $scope.area = null;

    $scope.citys = [];

    $scope.community = null;
    $scope.communitys = [];

    $scope.building = null;
    $scope.buildings = [];

    $scope.apartment = null;
    $scope.apartments = [];

});