define(function (require, exports, module) {

    // 挺复杂的，了解代码请咨询维护者。修改慎重
    'use strict';
    require('lib/js/uploadify/jquery.uploadify.min');
    require('lib/js/uploadifive/jquery.uploadifive.min');

    var EH = require('lib/js/everhome');
    var EHB = require('lib/js/everhome_bussiness');

    var $ = window.$;

    // 要加false，否则undefined
    var html5mode = $.browser.chrome || $.browser.safari || $.browser.mozilla || false;
    // html5mode = false;

    function getConfig(config, options) {
        options = options || {};
        config = config || {};
        // sourceType 上传到后台的资源标记
        // 1 图片
        if (options.sourceType !== undefined) {
            config.formData = $.extend({
                sourceType: options.sourceType
            }, config.formData);
        }

        if (options.uploader) {
            config.uploader = options.uploader;
            config.uploadScript = options.uploader;
        }
      
        

        var contentHost = EHB.GlobalConfig.getContentServer();
        
        var contentServer = contentHost.indexOf('10.1.1') > -1 ? contentHost : contentHost.split(':')[0];

        config = $.extend({
            width: 82,
            height: 34,
            buttonText: '上传',
            fileObjName: 'upload_file',
            buttonClass: 'eh_upload_button',
            removeCompleted: true,
            // flash
            swf: '/js/uploadify/uploadify.swf',
            uploader: (contentServer.indexOf('10') === 0) ? ('http://' + contentServer + '/upload/image') : ('https://' + contentServer + '/upload/image'),

            // html5
            uploadScript: (contentServer.indexOf('10') === 0) ? ('http://' + contentServer + '/upload/image?token=' + $.cookie('token')) : ('https://' + contentServer + '/upload/image?token=' + $.cookie('token'))
        }, config);

        return config;
    }

    function getConfigEvent(config, options) {
        config = config || {};
        options = options || {};

        options = $.extend({
            onInit: function () {
            },
            onStart: function () {
            },
            onSuccess: function () {
            },
            onError: function () {
            }
        }, options);


        var _onInit = config.onInit || function () {
            };
        config.onInit = function () {
            if (_onInit() !== false) {
                // 经过调试，onInit 是同步的，new Upload 的时候调用，故改成异步
                setTimeout(function () {
                    options.onInit();
                }, 1);
            }
        };

        if (html5mode) {
            var _onUploadComplete = config.onUploadComplete || function () {
                };
            config.onUploadComplete = function (file, data, res) {
                if (_onUploadComplete(file, data, res) !== false) {
                    data = EH.JSON.str2json(data);
                    if (data.errorCode == '0' || data.errorCode == '200') {
                        if (options.onSuccess(file, data, res) !== false) {
                            EH.Alert('上传成功', 'success');
                        }
                    } else {
                        if (options.onError(file, data, res) !== false) {
                            EH.Alert((data.errorDescription || '未知错误') + '  errorCode:' + data.errorCode, 'warning');
                        }
                    }
                }
            };
            config.onAddQueueItem = function (file) {
                // 有些机器的有些文件没有提供type过来
                if (file.type === '') {
                    return;
                }
                var result = file.type.match(new RegExp(config.fileType.replace(/ /g, '').replace(',', '|')));
                if (result.length === 0) {
                    this.data('uploadifive').error('FORBIDDEN_FILE_TYPE', file);
                }
            };
            var _onUpload = config.onUpload || function () {
                };
            config.onUpload = function () {
                if (_onUpload() !== false) {
                    options.onStart();
                }
            };
            config.onError = function (errorType, file) {
                switch (errorType) {
                    case 'FORBIDDEN_FILE_TYPE':
                        EH.Alert('类型不对', 'info');
                        break;
                    case 'FILE_SIZE_LIMIT_EXCEEDED':
                        EH.Alert('大小超出', 'info');
                        break;
                    default:
                        EH.Alert('未知错误 ' + errorType, 'info');
                        break;
                }

                file.queueItem.fadeOut(function () {
                    file.queueItem.remove();
                });
            };
        } else {
            var _onUploadSuccess = config.onUploadSuccess || function () {
                };
            config.onUploadSuccess = function (file, data, res) {
                if (_onUploadSuccess(file, data, res) !== false) {
                    data = EH.JSON.str2json(data);
                    if (data.errCode == '0') {
                        if (options.onSuccess(file, data, res) !== false) {
                            EH.Alert('上传成功', 'success');
                        }
                    } else {
                        if (options.onError(file, data, res) !== false) {
                            EH.Alert((data.errorDescription || '未知错误') + '  errorCode:' + data.errorCode, 'warning');
                        }
                    }
                }
            };
            var _onUploadStart = config.onUploadStart || function () {
                };
            config.onUploadStart = function () {
                if (_onUploadStart() !== false) {
                    options.onStart();
                }
            };
            config.overrideEvents = config.overrideEvents || [];
            config.overrideEvents.push('onSelectError');
            // 笑死，官方有bug。 见uploadify line 704 710 。 重复了
            config.onSelectError = function (file, errorCode, errorMsg) {
                switch (errorCode) {
                    case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
                        this.queueData.errorMsg = '数量不符合';
                        break;
                    case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                        this.queueData.errorMsg = '大小超出';
                        break;
                    case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                        this.queueData.errorMsg = '空文件';
                        break;
                    case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                        this.queueData.errorMsg = '类型不对';
                        break;
                    default:
                        this.queueData.errorMsg = '未知错误';
                        break;

                }
            };
        }

        // html5

        config.onProgress = function (file) {

        };


        return config;
    }

    var Upload = function (container, config, options) {
        this.$container = $(container);
        this.config = null;
        if (this.$container[0].id === '') {
            throw('eh_upload: container id ?');
        } else {
            this.config = getConfig(config, options);
            this.config = getConfigEvent(this.config, options);
            if (html5mode) {
                this.$container.uploadifive(this.config);
            } else {
                this.$container.uploadify(this.config);
            }
        }
    };
    Upload.prototype = {
        getQueue: function () {
            var t = this;
            if (t.config.queueID) {
                return $('#' + t.config.queueID)[0];
            } else {
                if (html5mode) {
                    return $('#uploadifive-' + t.$container[0].id + '-queue');
                }
                return $('#' + t.$container[0].id + '-queue')[0];
            }
        }
    };

    var UploadManager = {
        getImageUploadDelay: function (container, config, options, opt) {
            var ing = false;
            opt = $.extend({
                time: 1000,
                callback: function () {
                }
            }, opt);

            $(container).click(function () {
                if (!ing) {
                    EH.Alert('上传初始化中，1s后重试...', 'info', {time: 1500});
                }
            });
            setTimeout(function () {
                ing = true;
                // 因为延迟，可能被替换，不存在container
                if ($('#' + container.id).length === 0) {
                    return;
                }
                var upload = UploadManager.getImageUpload(container, config, options);
                opt.callback(upload);
            }, opt.time);
        },
        getImageUpload: function (container, config, options) {
            var imgConfig = $.extend({
                // flash
                fileSizeLimit: '1MB',
                fileTypeDesc: '图片',
                fileTypeExts: '*.png; *.jpg; *.jpeg; *.gif; *.bmp',
                // html5
                fileType: 'image/*',
                buttonText: '上传图片',
                multi: false
            }, config);
            var imgOptions = $.extend({
                sourceType: 1
            }, options);
            var u = new Upload(container, imgConfig, imgOptions);
            return u;
        },
        getImageDesc: function () {
            return '上传图片不超过1M, 格式：png,jpg,jpeg,gif,bmp';
        },
        getExcelUploadDelay: function (container, config, options, opt) {
            var ing = false;
            opt = $.extend({
                time: 1000,
                callback: function () {
                }
            }, opt);
            $(container).click(function () {
                if (!ing) {
                    EH.Alert('上传初始化中，1s后重试...', 'info');
                }
            });
            setTimeout(function () {
                ing = true;
                // 因为延迟，可能被替换，不存在container
                if ($('#' + container.id).length === 0) {
                    return;
                }
                var upload = UploadManager.getExcelUpload(container, config, options);
                opt.callback(upload);
            }, opt.time);
        },
        getExcelUpload: function (container, config, options) {
            config = $.extend({
                fileObjName: 'attachment',
                fileTypeDesc: 'Excel',
                fileTypeExts: '*.xls; *.xlsx;',
                // 在firefox 下会有问题
                fileType: 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                buttonText: '上传文件',
                multi: false
            }, config);

            var excelOptions = $.extend({
                uploader: '/evh/pm/importPMPropertyOwnerInfo'
            }, options);

            var u = new Upload(container, config, excelOptions);
            return u;
        }
    };


    return UploadManager;
});
