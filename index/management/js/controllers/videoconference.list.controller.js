/**
 * Created by Administrator on 2016/1/18.
 */
window.myModule.controller('VideoconferenceListController', function ($scope, DataService, $filter, $state, $zl) {
    'use strict';

    //var userInfo = $zl.userInfo.get();
    //if(!userInfo) {
    //    $state.go('login');
    //    $zl.tips('用户未登录');
    //}
    $scope.gridData = {
        columns: [
            {field: 'createTime', name: '申请日期'},
            {field: 'applicantCompany', name: '公司名称'},
            {field: 'applicantName', name: '姓名'},
            {field: 'applicantPhone', name: '电话'},
            {field: 'applicantEmail', name: '邮箱'}
        ],
        getData: function (next) {
            return DataService.getVideoMeetingList({
                pageAnchor: next,
                applicationType: "videoconf"
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