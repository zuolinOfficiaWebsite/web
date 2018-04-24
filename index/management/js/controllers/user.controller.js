/**
 * Created by Administrator on 2016/1/13.
 */
window.myModule.controller('UserController', function ($scope, DataService, $state, $zl, $rootScope, ConfigService) {
    'use strict';

    function getUser() {
        DataService.getUser().then(function (data) {
            $scope.user = data;
            $zl.userInfo.set(data);
        }, function () {
            $state.go('login');
        });
    }

    //getUser();

    $scope.$on(ConfigService.eventKey.USER_LOGIN, function (e) {
        getUser();
    });

    $scope.$on(ConfigService.eventKey.USER_LOGOFF, function (e) {
        $scope.user = null;
    });

    $scope.onLogin = function () {
        $state.go('login');
    };

    $scope.onLogoff = function () {
        DataService.logoffUser().then(function () {
            $zl.userInfo.set(null);
            $rootScope.$broadcast(ConfigService.eventKey.USER_LOGOFF);
            $state.go('login');
        });
    };
});