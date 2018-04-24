/**
 * Created by huangbaitu on 16/1/13.
 */
window.myModule.controller('AppListController', function($scope, $zl, DataService, $state, DataCacheService, $filter) {
   'use strict';
    //var userInfo = $zl.userInfo.get();
    //if(!userInfo) {
    //    $state.go('login');
    //    $zl.tips('用户未登录');
    //}
    $scope.gridData = {
        columns: [
            {field: 'name', name: 'APP名'},
            {field: 'version', name: '版本'},
            {field: 'createTime', name: '更新时间'}
        ],
        actions: [{
            type:'btn',
            html:'编辑',
            action: function(value) {
                DataCacheService['appInfo'].set(value);
                $state.go('app_upload');
            }
        }],
        getData: function (next) {
            return DataService.getAppList({
                pageAnchor: next,
                pageSize: 10
            });
        }
    };
    $scope.appManage = {

    };

    $scope.$watch('gridData.data', function() {
        if($scope.gridData.data && $scope.gridData.data.length > 0) {
            _.each($scope.gridData.data.reverse(), function(item, index, array) {
                item.createTime = $filter('date')(item.createTime, 'yyyy-MM-dd');
            });
        }
    });



});