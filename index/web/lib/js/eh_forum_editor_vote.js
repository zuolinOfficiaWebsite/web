define(function (require, exports, module) {

    "use strict";

    var T_Forum = require('lib/tpl/build/forum');
    var EDate = require('lib/js/eh_date');
    var Upload = require('lib/js/eh_upload');
    var EH = require('lib/js/everhome');
    var EHB = require('lib/js/everhome_bussiness');
    var FormValid = require('lib/js/eh_form');
    var Time = require('lib/js/eh_time');

    var $ = window.$;

    var FEV = function (container, options) {
        this.$container = $(container);
        this.$dom = null;

        this.form = null;

        this.options = $.extend({
            forumId: null,
            needPhotoSelect: true,
            onSend: function () {
            }
        }, options);
    };
    FEV.prototype = {
        init: function () {
            var t = this;
            t.render();
            t.bindEvent();
            t.initDate();

            t.addOption();
            t.addOption();

            t.initForm();
        },
        render: function () {
            var t = this;
            t.$dom = $(T_Forum({
                tpl: 'editor_vote'
            }));
            t.$container.html(t.$dom);
        },
        initDate: function () {
            var t = this;
            EDate.loadTimePickerAddon(function () {
                t.$dom.find('#id_fev_begin').datetimepicker({
                    minDate: '0d'
                });
                t.$dom.find('#id_fev_end').datetimepicker({
                    minDate: '0d'
                });
            });

        },
        bindEvent: function () {
            var t = this;
            t.$dom.on('click', '.service_account_forum_editor_add_photo', function (event) {
                t.initPhotoSelect();
            });

            t.$dom.on('click', '.service_account_forum_editor_close_p', function (event) {
                $(this).parents('.thumbnail').parent().remove();
            });

            t.$dom.on('click', '.service_account_forum_editor_add_option', function (event) {
                t.addOption();
            });

            t.$dom.on('click', '.service_account_forum_editor_option_close', function (event) {
                t.removeOption($(this).parents('.row:first'));
            });

            t.$dom.on('click', '.service_account_forum_editor_option_add_photo', function (event) {
                t.initOptionPhotoSelect($(this).parents('.row:first'));
            });
        },
        showOptionPhoto: function ($d, url, uri) {
            var cp = $d.find('.service_account_forum_editor_option_p');
            cp.html(T_Forum({
                tpl: 'p_pre',
                data: {
                    url: url,
                    uri: uri
                }
            }));
        },
        addOption: function () {
            var t = this;
            var $c = $('.service_account_forum_editor_option_container');
            var id_suf = parseInt(Math.random() * 10000);
            var $d = $(T_Forum({
                tpl: 'editor_vote_option',
                id_suf: id_suf,
                needPhotoSelect: t.options.needPhotoSelect
            }));
            $c.append($d);

            Upload.getImageUploadDelay($('#service_account_photo_text_editor_option_upload_' + id_suf)[0], {}, {
                onSuccess: function (file, data, res) {
                    t.showOptionPhoto($d, data.response.url, data.response.uri);
                }
            });
        },
        removeOption: function ($p) {
            $p.remove();
        },
        getOptions: function () {
            var t = this;
            var result = [];
            var $cs = t.$dom.find('.service_account_forum_editor_option_container>.row');
            $cs.each(function (index, ele) {
                var itemId = index;
                $(ele).find('.service_account_forum_editor_option_content').attr('data-itemId', itemId);
                var subject = $(ele).find('.service_account_forum_editor_option_content').val();
                var uri = $(ele).find('.service_account_forum_editor_option_p>div').attr('data-uri');
                if (subject === '') {
                    result = null;
                    return false;
                }
                if (uri) {
                    result.push({
                        itemId: itemId,
                        subject: subject,
                        coverUrl: uri
                    });
                } else {
                    result.push({
                        itemId: itemId,
                        subject: subject
                    });
                }
            });

            return result;
        },
        initForm: function () {
            var t = this;
            t.form = FormValid.valid(t.$dom.find('.eh_form_valid')[0], {
                tiptype: function (msg, o, cssctl) {
                    // 如果是新增的input不会自动提示。那就自己做吧
                    var d = o.obj;
                    d.parent().find('.Validform_checktip').remove();
                    if (o.type == 3) {
                        d.parent().append('<span class="Validform_checktip Validform_wrong">' + msg + '</span>');
                    } else if (o.type == 2) {
                        d.parent().append('<span class="Validform_checktip Validform_right">' + msg + '</span>');
                    }
                },
                beforeSubmit: function () {
                    t.doSubmit();
                    return false;
                }
            });
        },
        processTime: function (data) {
            return Time.milliseconds2str(Time.str2milliseconds(data),'second');
        },
        doSubmit: function () {
            var t = this;

            var forumId = t.options.forumId || $('#id_fev_forum').val();
            var startTime = t.processTime($('#id_fev_begin').val());
            var endTime = t.processTime($('#id_fev_end').val());
            var multiChoiceFlag = parseInt($('#id_fev_mul').val());
            var anonymousFlag = parseInt($('#id_fev_ano').val());
            var title = $('#id_fev_title').val();
            var content = $('#id_fev_content').val() + '\n截止时间：' + endTime;
            var fileKey = t.getPhoto();

            var itemList = t.getOptions();

            var attachments = [];
            if (fileKey !== null) {
                $.each(fileKey, function (index, ele) {
                    attachments.push({
                        contentType: 'IMAGE',
                        contentUri: ele
                    });
                });
            }

            var fData = {
                forumId: forumId,
                subject: title,
                content: content,
                contentType: 'text/plain',
                embeddedAppId: '14',
                embeddedJson: EH.JSON.json2str({
                    startTime: startTime,
                    multiChoiceFlag: multiChoiceFlag,
                    anonymousFlag: anonymousFlag,
                    stopTime: endTime,
                    itemList: itemList
                }),
                attachments: attachments
            };

            t.options.onSend(fData, {
                onSendSuccess: function (data) {
                    EH.Alert('发送成功', 'success');
                }
            });
        },
        showPhoto: function (src, fileKey) {
            var t = this;
            t.$dom.find('.service_account_forum_editor_preivew_p').append(T_Forum({
                tpl: 'p_pre',
                data: {
                    src: src,
                    fileKey: fileKey
                }
            }));
        },
        getPhoto: function () {
            var t = this;
            var d = t.$dom.find('.service_account_forum_editor_preivew_p>div');
            if (d.length === 0) {
                return null;
            }
            var arr = [];
            d.each(function (index, e) {
                arr.push($(e).attr('data-filekey'));
            });
            return arr;
        },
        removePhoto: function () {
            var t = this;
            t.$dom.find('.service_account_forum_editor_preivew_p').html('');
        }
    };


    return FEV;
});