define(function (require, exports, module) {

    "use strict";

    var T_Forum = require('lib/tpl/build/forum');
    var EDate = require('lib/js/eh_date');
    var Upload = require('lib/js/eh_upload');
    var Request = require('lib/js/eh_request');
    var EH = require('lib/js/everhome');
    var EHB = require('lib/js/everhome_bussiness');
    var FormValid = require('lib/js/eh_form');

    var $ = window.$;

    var FEA = function (container, options) {
        this.$container = $(container);
        this.$dom = null;

        this.form = null;
        
        this.id = options.id;

        this.options = $.extend({
            forumId: null,
            needPhotoSelect: true,
            onSend: function () {
            }
        }, options);
    };
    FEA.prototype = {
        init: function () {
            var t = this;
            t.render();
            t.bindEvent();
            if(t.id == 'id_property_forum_container') t.initActivityTag();
            t.initDate();
            t.initUpload();
            t.initForm();
        },
        render: function () {
            var t = this;
            t.$dom = $(T_Forum({
                tpl: 'editor_activity',
                id:t.id,
                needPhotoSelect: t.options.needPhotoSelect
            }));
            t.$container.html(t.$dom);
        },
        initDate: function () {
            var t = this;
            EDate.loadTimePickerAddon(function () {
                t.$dom.find('#id_fea_begin').datetimepicker({
                    minDate: '0d'
                });
                t.$dom.find('#id_fea_end').datetimepicker({
                    minDate: '0d'
                });
            });

        },
        initActivityTag:function(){
        	var t = this;
        	Request.postlistActivityCategories({namespaceId: EHB.namespaceId}, function (res) {
        		if(res && res.response){
        			 t.$dom.find('.forum_activity_tag').html($(T_Forum({
                         tpl: 'activity_tag',
                         data: res.response.activityCategories
                     })));
        		}
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

            t.$dom.on('click', '#id_fea_addr_lbs', function () {
                require.async('lib/js/eh_lbs', function (M) {
                    var m = new M(function (poi) {
                        $('#id_fea_addr').val(poi.title + '(' + poi.address + ')').attr('data-lat', poi.point.lat).attr('data-lng', poi.point.lng);
                    });
                    m.init();
                });
                return false;
            });
        },
        initUpload: function () {
            var t = this;
            // todo  文件大小啊等等
            $('.service_account_photo_text_editor_upload_desc').html(Upload.getImageDesc);
            Upload.getImageUploadDelay($('#service_account_photo_text_editor_upload')[0], {}, {
                onSuccess: function (file, data, res) {
                    t.showPhoto(data.response.url, data.response.uri);
                }
            });
        },
        initForm: function () {
            var t = this;
            t.form = FormValid.valid(t.$dom.find('.eh_form_valid')[0], {
                beforeCheck: function () {
                    if (t.form.check(false)) {
                        var addr = $('#id_fea_addr').val();
                        var longitude = $('#id_fea_addr').attr('data-lng');
                        var latitude = $('#id_fea_addr').attr('data-lat');
                        if (!(addr && longitude && latitude)) {
                            EH.Alert('请选择活动地点', 'warning');
                            return false;
                        }
                        return true;
                    }
                    return false;
                },
                beforeSubmit: function () {
                    t.doSubmit();
                    return false;
                }
            });
        },
        doSubmit: function () {
            var t = this;

            var forumId = t.options.forumId;
            var title = $('#id_fea_title').val();
            var begin = $('#id_fea_begin').val();
            var end = $('#id_fea_end').val();

            var addr = $('#id_fea_addr').val();
            var longitude = $('#id_fea_addr').attr('data-lng');
            var latitude = $('#id_fea_addr').attr('data-lat');

            var content = $('#id_fea_content').val();
            content = '开始时间：' + begin + '\n结束时间：' + end + '\n活动地点：' + addr + '\n' + content;
            var fileKey = t.getPhoto();

            var confirmFlag = $('#id_fea_confirmFlag')[0].checked;
            
            var tag = $('#activityTag option:selected').text();

            var signFlag = $('#id_fea_signFlag')[0].checked;

            var groupId = null;
            $.each($('.user_group_forum_list li'), function (index, ele) {
                if ($(ele).hasClass('active')) {
                    groupId = $(this).attr('data-groupId');
                }
            })

            var embeddedJson = {
                subject: title,
                location: addr,
                startTime: begin + ':00',
                endTime: end + ':00',
                checkinFlag: signFlag ? 1 : 0,
                confirmFlag: confirmFlag ? 1 : 0,
                groupId: groupId,
                longitude: longitude,
                latitude: latitude,
                tag: tag
            };

            var attachments = [];
            if (fileKey != null) {
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
                embeddedJson: EH.JSON.json2str(embeddedJson),
                attachments: attachments,
                embeddedAppId: 3
            };
            t.options.onSend(fData, {
                onSendSuccess: function () {
                    EH.Alert('提交成功', 'success');
                }
            });
        },
        showPhoto: function (url, uri) {
            var t = this;
            t.$dom.find('.service_account_forum_editor_preivew_p').append(T_Forum({
                tpl: 'p_pre',
                data: {
                    url: url,
                    uri: uri
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
                arr.push($(e).attr('data-uri'));
            });
            return arr;
        },
        removePhoto: function () {
            var t = this;
            t.$dom.find('.service_account_forum_editor_preivew_p').html('');
        },
        initPhotoSelect: function () {
            var t = this;
            require.async('js/service_account/photo_select', function (PS) {
                var ps = new PS();
                ps.select(function (arr) {
                    Request.getqrymlibimage({
                        neId: t.neId,
                        id: arr[0]
                    }, function (data) {
                        t.showPhoto(data.mlibImage.resPath, data.mlibImage.resId);
                    });
                });
                ps.show();
            });
        }
    };


    return FEA;
});
