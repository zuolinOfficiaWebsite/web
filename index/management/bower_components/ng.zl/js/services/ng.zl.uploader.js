angular.module('ng.zl.uploader', []).service('$zlUploader', function ($log, $q) {
    'use strict';

    // 不能采用 promise 的形式， 因为会有多次上传。 而promise 只一次
    var files = [];

    var Upload = function (container, config) {
        var def = $q.defer();

        var $container = $(container);
        var _config = $.extend({
            //width: 82,
            height: 37,
            buttonText: '上传',
            buttonClass: 'zl-btn-upload',
            removeCompleted: true
            //onUploadComplete: function (file, data) {
            //    data = angular.fromJson(data);
            //    if (data.errorCode === 200) {
            //        def.resolve(file);
            //    }else{
            //        def.reject(data.errorDescription || '未知错误');
            //    }
            //}
        }, config);

        if ($container[0].id === '') {
            throw('container id ?');
        } else if (_config.url) {
            throw(' url ?');
        } else {
            $container.uploadifive(_config);
        }

        return def.promise;
    };


    var fileUpload = function(container, config) {
        config = $.extend({
            fileObjName: 'attachment',
            buttonText: '上传文件',
            multi: false
        }, config);

        return Upload(container, config);
    };
    
    var imgUpload = function (container, config) {
        config = $.extend({
            fileObjName: 'resFiles',
            buttonText: '上传图片',
            multi: false
        }, config);
        return Upload(container, config);
    };

    return {
        fileUpload: fileUpload,
        imgUpload: imgUpload
    };
});