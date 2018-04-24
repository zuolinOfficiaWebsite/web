/**
 * Created by Administrator on 2016/1/15.
 */
window.myModule.controller("NewsListController", function($scope, $timeout, DataService, $state, $filter, DataCacheService, $zl) {
    'use strict';

    //var userInfo = $zl.userInfo.get();
    //if(!userInfo) {
    //    $state.go('login');
    //    $zl.tips('用户未登录');
    //}
    $scope.news = {};
    $scope.gridData = {
        columns: [
            {field: 'title', name: '标题'},
            {field: 'sourceUriShow', name: '来源'},
            {field: 'sourceText', name:'来源标题'},
            {field: 'tags', name: '标签'},
            {field: 'statusInfo', name: '状态'},
            {field: 'createDate', name: '日期'}
        ],
        actions: [{
            type: 'btn',
            html: '编辑',
            action: function(value) {
                DataCacheService['newsInfo'].set(value);
                $state.go('news_publish');
            }
        }],
        getData: function (next) {
            return DataService.getNewsList({
                pageAnchor: next,
                pageSize: 10
            });
        }
    };
    var statusInfo = ['已发布', '草稿'];

    $scope.$watch('gridData.data', function() {
        if($scope.gridData.data && $scope.gridData.data.length > 0) {
            //$scope.gridData.data.sort(function(a, b) {
            //    return b.createTime - a.createTime;
            //});
            _.each($scope.gridData.data, function(item, index, array) {
                item.createDate = $filter('date')(item.createTime, 'yyyy-MM-dd');
                item.statusInfo = statusInfo[item.status];
                if(item.sourceUri && item.sourceUri.length > 50) {
                    item.sourceUriShow = item.sourceUri.substr(0, 50) + "...";
                } else {
                    item.sourceUriShow = item.sourceUri || '';
                }
            });
        }
    });

});