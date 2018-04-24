/**
 * Created by huangbaitu on 16/1/12.
 */
window.myModule.controller('FeedbackListController', function ($scope, DataService, $filter, $state, $zl) {
    'use strict';

    //var userInfo = $zl.userInfo.get();
    //if(!userInfo) {
    //    $state.go('login');
    //    $zl.tips('用户未登录');
    //}
    $scope.gridData = {
        columns: [
            {field: 'createTime', name: '反馈日期'},
            {field: 'subject', name: '问题或建议'},
            {field: 'content', name: '详情'},
            {field: 'contact', name: '联系方式'}
        ],
        getData: function (next) {
            return DataService.getFeedback({
                pageAnchor: next,
                pageSize: 9
            });
        }

    };
    $scope.$watch('gridData.data', function() {
        if($scope.gridData.data && $scope.gridData.data.length > 0) {
            _.each($scope.gridData.data.reverse(), function(item, index, array) {
                item.createTime = $filter('date')(item.createTime, 'yyyy-MM-dd');
            });
        }
    });
});