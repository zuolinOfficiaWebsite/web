myModule.controller('UploaderController', function ($scope, $zlUploader, $zl) {
    'use strict';

    $zlUploader.imgUpload($('#uploadFile'), {
        uploadScript: '/admin/address/importAddressInfos',
        onUploadComplete: function (file, data) {
            data = angular.fromJson(data);
            if (data.errorCode === 200) {
                $scope.$apply(function () {
                    $zl.tips('上传成功');
                });
            } else {
                $scope.$apply(function () {
                    $zl.tips(data.errorDescription || '未知错误');
                });
            }
        }
    });

}).controller('DialogController', function ($scope, $timeout, $zl) {

    'use strict';

    $scope.onAlert = function (event) {
        $zl.alert('asdf', 'asdf', event).then(function () {
            window.console.log('after alert');
        });
    };

    $scope.onConfirm = function (event) {
        $zl.confirm('a', 'bbbb', event).then(function () {
            window.console.log('after confirm ok');
        }, function () {
            window.console.log('after confirm cancel');
        });
    };

    $scope.onPrompt = function (event) {
        $zl.prompt('a', 'bbbb', event).then(function (word) {
            window.console.log('after prompt ok' + word);
        }, function () {
            window.console.log('after prompt cancel');
        });
    };

    var num = 1;
    $scope.onToast = function () {
        num++;
        $zl.tips('1111 ' + num).then(function () {
            window.console.log('after toast');
        });
    };

    $scope.onProgressStart = function () {
        $zl.progress.start();
    };

    $scope.onProgressDone = function () {
        $zl.progress.done();
    };
}).controller('ProgressController', function ($scope, $zl) {
    'use strict';
    $scope.start = function () {
        $zl.progress.start();
    };

    $scope.done = function () {
        $zl.progress.done();
    };
});