/**
 * Created by Administrator on 2016/1/17.
 */
window.myModule.controller('GovernmentListController', function($scope, $zl, $filter, DataService, DataCacheService, $state) {
    'use strict';

    //var userInfo = $zl.userInfo.get();
    //if(!userInfo) {
    //    $state.go('login');
    //    $zl.tips('用户未登录');
    //}
    $scope.government = {
        searchName: ""
    };

    $scope.gridData = {
        enableExport: true,
        exportOptions: {xls: true},
        columns: [
            {field: 'createTime', name: '申请日期'},
            {field: 'provinceName', name: '省份'},
            {field: 'cityName', name: '城市'},
            {field: 'areaName', name: '区县'},
            {field: 'name', name: '机构名称'},
            {field: 'address', name: '办公地址'},
            {field: 'applicantName', name: '姓名'},
            {field: 'applicantPhone', name: '电话'},
            {field: 'applicantOccupation', name: '职位'},
            {field: 'applicantEmail', name: '邮箱'}
        ],
        getData: function (next) {
            return DataService.getCooperationList({
                pageAnchor: next,
                cooperationType: 'GA',
                keyWords: $scope.government.searchName
            });
        }
    };

    $scope.government.search = function () {
        $scope.gridData.watchReload = true;
    };

    $scope.$watch('gridData.data', function() {
        if($scope.gridData.data && $scope.gridData.data.length > 0) {
            $scope.government.num = ($scope.gridData.data || []).length;
            _.each($scope.gridData.data.reverse(), function(item, index, array) {
                item.createTime = $filter('date')(item.createTime, 'yyyy-MM-dd');
            });
        }
    });
});
