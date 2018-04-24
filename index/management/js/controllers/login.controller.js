/**
 * Created by huang baitu on 16/1/12.
 */
window.myModule.controller('LoginController', function ($scope, DataService, $zl, $state, $rootScope, ConfigService, StorageService) {
    'use strict';
    $scope.user = {};

    $scope.onSend = function () {
        if ($scope.Login.$valid) {
            DataService.logonUser({
                userIdentifier: $scope.user.userIdentifier,
                password: $zl.sha256($scope.user.password)
            }).then(function (data) {
                $zl.tips('登录成功');
                $rootScope.$broadcast(ConfigService.eventKey.USER_LOGIN);
                StorageService.CONTENTSERVER.set(data.contentServer);
                StorageService.USERID.set(data.uid);
                $state.go('main');
            }, function() {
                StorageService.CONTENTSERVER.set(null);
                StorageService.USERID.set(null);
                $state.go('login');
            });
        }
    };
});