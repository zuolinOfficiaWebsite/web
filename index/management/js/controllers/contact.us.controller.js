/**
 * Created by Administrator on 2016/5/6.
 */
window.myModule.controller('ContactUsController', function($scope, $state, $zl, $timeout, $filter, DataService, CooperationTypeList) {
    'use strict';
    //var userInfo = $zl.userInfo.get();
    //if(!userInfo) {
    //    $state.go('login');
    //    $zl.tips('用户未登录');
    //}
    $scope.gridData = {
        enableExport: true,
        exportOptions: {xls: true},
        columns: [
            {field: 'createDate', name: '申请日期'},
            {field: 'cooperationTypeInfo', name: '类型'},
            {field: 'name', name: '机构名称'},
            {field: 'address', name: '地址'},
            {field: 'applicantName', name: '联系人'},
            {field: 'applicantPhone', name: '联系电话'},
            {field: 'applicantEmail', name: '邮箱'},
            {field: 'applicantOccupation', name: '职位'},
            {field: 'description', name: '说明'}
        ],
        getData: function (next) {
            return DataService.getCooperationList({
                pageAnchor: next,
                cooperationType: $scope.selectedType,
                keyWords: $scope.keyword
            });
        }
    };

    $scope.cooperationTypeList = CooperationTypeList;

    function getTypeName(type) {
        var result = "";
        _.each(CooperationTypeList, function(v) {
            if(v.value === type) {
                result = v.name;
            }
        });
        return result;
    }

    $scope.reset = function() {
        $scope.keyword = "";
        $scope.selectedType = null;
    };

    $scope.$watch('gridData.data', function() {
        if($scope.gridData.data && $scope.gridData.data.length > 0) {

            $scope.gridData.data.sort(function(a, b) {
                return b.createTime - a.createTime;
            });
            var item;
            for(var i = 0; i < $scope.gridData.data.length; i++) {
                item = $scope.gridData.data[i];
                if(item.cooperationType === 'BUS' || item.cooperationType === 'GA') {
                    $scope.gridData.data.splice(i, 1);
                    i--;
                } else {
                    item.createDate = $filter('date')(item.createTime, 'yyyy-MM-dd');
                    item.cooperationTypeInfo = getTypeName(item.cooperationType);
                }
            }

        }
    });

    $scope.search = function() {
        $scope.gridData.watchReload = true;
    };

});