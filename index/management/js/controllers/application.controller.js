window.myModule.controller('ApplicationController', function ($scope, $mdSidenav, $location, $state, ConfigService, $zl) {
    'use strict';

    $scope.$on(ConfigService.eventKey.USER_LOGIN, function() {
        setSide(true);
    });
    $scope.$on(ConfigService.eventKey.USER_LOGOFF, function() {
        setSide(false);

    });

    function setSide(bool) {
        if(!bool) {
            $scope.menu = null;
            return;
        }
        $scope.menu = {};

        $scope.menu.toggle = function () {
            $mdSidenav('left').toggle();
        };
        $scope.menu.sections = [{
            name: '首页',
            children: [{
                name: 'welcome',
                url: '/main'
            }]
        }, {
            name: '左邻新闻',
            children: [{
                name: '新闻列表',
                url: '/news/list'
            }, {
                name: '新闻发布',
                url: '/news/publish'
            }]
        }, {
            name: 'APP上传',
            children: [{
                name: 'APP列表',
                url: '/app/list'
            }, {
                name: '新增APP',
                url: '/app/upload'
            }]
        }, {
            name: '政府入驻',
            children: [{
                name: '政府入驻',
                url: '/government/list'
            }]
        }, {
            name: '商家入驻',
            children: [{
                name: '商家入驻',
                url: '/business/list'
            }]
        }, {
            name: '视频会议',
            children: [{
                name: '视频会议',
                url: '/videoconference/list'
            }]
        }, {
            name: '意见反馈',
            children: [{
                name: '意见反馈',
                url: '/feedback/list'
            }]
        }, {
            name: '联系我们',
            children: [{
                name: '联系我们',
                url: '/contact_us'
            }]
        }];

        $scope.menu.section = [$scope.menu.sections[0], $scope.menu.sections[0].children[0]];

        $scope.menu.onHead = function (section) {
            section.isClose = !section.isClose;
        };
        $scope.menu.onChildren = function () {
            $mdSidenav('left').toggle();
            $state.reload();
        };

        _.each($scope.menu.sections, function (value) {
            value.isClose = true;
        });
    }


    $scope.$on('$stateChangeSuccess', function (event, toState) {
        if($scope.menu) {
            _.each($scope.menu.sections, function (value) {
                _.each(value.children, function (val) {
                    if (val.url === toState.url) {
                        $scope.menu.section = [value, val];
                        value.isClose = false;
                        $mdSidenav('left').toggle();
                    }
                });

            });
        }

    });

    $scope.$on('$stateChangeStart', function (event, toState) {

        if(toState.url !== '/login' && toState.url !== '/main' && !$zl.userInfo.get()) {
            $state.go('login');
            $zl.tips('用户未登录');
        }
    });

    $scope.search = {};
    $scope.search.searchText = null;
    $scope.search.selectedItem = null;
    $scope.search.querySearch = function (searchText) {
        var result = [];
        _.each($scope.menu.sections, function (value) {
            _.each(value.children, function (val) {
                if (val.name.indexOf(searchText) > -1) {
                    result.push(val);
                }
            });
        });
        return result;
    };
    $scope.search.onSelect = function (item) {
        if (item && item.url) {
            $location.url(item.url);
        }
    };
});

