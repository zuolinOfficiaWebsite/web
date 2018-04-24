/**
 * Created by huangbaitu on 16/1/13.
 */
window.myModule.controller('AppUploadController', function ($scope, $state, DataService, $zl, $mdMedia, UploaderService, $q, DataCacheService, $location) {
    'use strict';
    //var userInfo = $zl.userInfo.get();
    //if(!userInfo) {
    //    $state.go('login');
    //    $zl.tips('用户未登录');
    //}

    $scope.host = $location.$$protocol + "://" + $location.$$host + "/";

    $scope.addApp = true;
    $scope.editApp = false;

    UploaderService.fileUpload($('#uploadApk'), {
        uploadScript: '/corp/apk/uploadFiles',
      //  uploadScript: '/apk/uploadFiles',
        buttonText: '上传安卓APK',
        onAddQueueItem: function (file) {
            var postfix = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length);
            if (postfix.toLowerCase() !== 'apk') {
                $('#uploadFile').uploadifive('cancel', file);
                $zl.tips('类型错误，请上传APK文件');
            }
        },
        onUploadComplete: function (file, data) {
            data = angular.fromJson(data);

            if (data.errorCode === 200) {
                $scope.$apply(function () {
                    $scope.appInfo.androidPath = data.response.resSummaryInfos[0].path;
                    $zl.tips('上传成功');
                });
            } else {
                $scope.$apply(function () {
                    $zl.tips(data.errorDescription || '未知错误');
                });
            }
        }
    });
     UploaderService.fileUpload($('#uploadLogo'), {
        uploadScript: '/corp/apk/uploadFiles',
     // uploadScript: 'apk/uploadFiles',
        buttonText: '上传APP图标',
        fileType: 'jpg',
        onAddQueueItem: function (file) {
            var postfix = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length);
            var fileType = {
                'png': true,
                'jpg': true,
                'bmp': true
            };
            if (fileType[postfix.toLowerCase()] !== true) {
                $('#uploadQrCode').uploadifive('cancel', file);
                $zl.tips('类型错误，请上传图片');
            }
        },
        onUploadComplete: function (file, data) {
            data = angular.fromJson(data);

            if (data.errorCode === 200) {
                $scope.$apply(function () {
                    $scope.appInfo.logoPath = data.response.resSummaryInfos[0].path;
                    $zl.tips('上传成功');
                });
            } else {
                console.log(data.errorDescription)
                $scope.$apply(function () {
                    $zl.tips(data.errorDescription || '未知错误');
                });
            }
        }
    });
    UploaderService.fileUpload($('#uploadQrCode'), {
        uploadScript: '/corp/apk/uploadFiles',
      // uploadScript: 'apk/uploadFiles',
        buttonText: '上传二维码',
        fileType: 'jpg',
        onAddQueueItem: function (file) {
            var postfix = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length);
            var fileType = {
                'png': true,
                'jpg': true,
                'bmp': true
            };
            if (fileType[postfix.toLowerCase()] !== true) {
                $('#uploadQrCode').uploadifive('cancel', file);
                $zl.tips('类型错误，请上传图片');
            }
        },
        onUploadComplete: function (file, data) {
            data = angular.fromJson(data);

            if (data.errorCode === 200) {
                $scope.$apply(function () {
                    $scope.appInfo.qrCodePath = data.response.resSummaryInfos[0].path;
                    $zl.tips('上传成功');
                });
            } else {
                $scope.$apply(function () {
                    $zl.tips(data.errorDescription || '未知错误');
                });
            }
        }
    });

    $scope.appInfo = {
      //  appType: 0, //0 IOS, 1 Android
        appName: "",
        appVersion: "",
        androidPath: "", //only for android
        iosPath: "", //only for IOS
        qrCodePath: "",
        zoneName:"",
        logoPath:""
    };

    $scope.realmInfo = {
        realms: [],
        selectedRealmId: null
    };

    if (!angular.equals(DataCacheService['appInfo'].get(), {})) {
        $scope.editApp = true;
        $scope.addApp = false;

        var data = DataCacheService['appInfo'].getReset();
        console.log('data' ,data);
      //  $scope.appInfo.appType = data.type;
        $scope.appInfo.id = data.id;
        $scope.appInfo.appName = data.name;
        $scope.appInfo.zoneName = data.  zoneName;
        $scope.appInfo.appVersion = data.version;
        $scope.appInfo.appUrl = data.downloadUrl || "";
        $scope.appInfo.qrCodePath = data.qrCodePath || "";
        $scope.appInfo.iosPath = data.iosPath || "";
        $scope.appInfo.androidPath = data.androidPath|| "";
        $scope.appInfo.realmId = data.realmId;
        $scope.appInfo.selectedRealmId = data.realmId;
        $scope.appInfo.logoPath = data.logoPath;
    } else {
        $scope.editApp = false;
        $scope.addApp = true;
    }
    console.log(' $scope.editApp', $scope.editApp);
    $scope.onAddAppSubmit = function () {
        console.log()
        var realmId = parseInt($scope.realmInfo.selectedRealmId);
        // if(isNaN(realmId)) {
        //     $zl.tips("请选择一个类型！");
        //     return;
        // }

        var postData = {
           // type: $scope.appInfo.appType,
            name: $scope.appInfo.appName,
            version: $scope.appInfo.appVersion,
            iosPath: $scope.appInfo.iosPath,
            androidPath:$scope.appInfo.androidPath,
            downloadUrl: $scope.appInfo.appUrl,
            qrCodePath: $scope.appInfo.qrCodePath,
           // realmId: parseInt($scope.realmInfo.selectedRealmId),
            zoneName:$scope.appInfo.zoneName,
            logoPath: $scope.appInfo.logoPath
        };
        if($scope.editApp){
             postData.id = $scope.appInfo.id;
        }
        if(/^\d+\.{1}\d+\.{1}\d+(-.+)?$/i.test($scope.appInfo.appVersion) === false) {
            $zl.tips("版本号格式不正确！");
            return;
        }
        if( $scope.addApp ){
              DataService.postAppInfo(postData).then(function() {
            $zl.tips("提交app成功");
            $state.go('app_list');
        }, function() {
            $zl.tips("提交app失败");
        });
    }
    if(  $scope.editApp ){
            DataService.updateApkInfo(postData).then(function() {
            $zl.tips("修改app成功");
            $state.go('app_list');
        }, function() {
            $zl.tips("提交app失败");
        });
    }
      
    };


    DataService.getAppRealm({}).then(function (data) {
        $scope.realmInfo.realms = data.realms;
    });
});