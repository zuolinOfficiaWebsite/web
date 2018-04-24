define(function(require, exports, module) {

    'use strict';

    var T_Forum = require('lib/tpl/build/forum');
    var Request = require('lib/js/eh_request');
    var FormValid = require('lib/js/eh_form');
    var Upload = require('lib/js/eh_upload');
    var EH = require('lib/js/everhome');
    var Editor = require('lib/js/eh_editor');

    var Publish = function(container, options) {
        this.$container = $(container);

        this.$dom = null;
        this.editor = null;

        this.options = $.extend({
            forumId: null,
            hasAuthor: false,
            hasTopicContent: false,
            hasRichEditorBox: true,
            hasLink: false,
            onSend: function() {},
            beforeSubmit: function(){}
        },options);

        this.forumId = this.options.forumId;
    };
    Publish.prototype = {
        init: function() {
            var t = this;
            t.render();
            if (t.options.hasRichEditorBox) {
                t.initEditor();
            }
            t.initUpload();
            t.initForm();
            t.bindEvent();
        },
        render: function() {
            var t = this;
            t.$dom = $(T_Forum({
                tpl: 'editor_richtext',
                options: t.options
            }));
            t.$container.html(t.$dom);
        },
        initEditor: function() {
            var t = this;
            t.editor = Editor.eh_createEditor('service_account_forum_editor', {
                initialFrameHeight: 250
            }, {
                toolbar: 'simple_insertimage'
            });
        },
        bindEvent: function() {
            var t = this;
            t.$dom.on('click', '.garden_information_photo_text_cancel', function() {
                if(t.options.garden_information_manage) {
                    require.async('js/garden/information_manage/forum', function (I) {
                        var i = new I(t.$container, t.typeNum ,t.typeId);
                        i.init();
                    });
                }
            });
        },
        initUpload: function() {
            var t = this;
            t.$dom.find('.service_account_forum_editor_upload_desc').html(Upload.getImageDesc());

            Upload.getImageUploadDelay(t.$dom.find('#service_account_forum_editor_upload')[0], {},{
                onSuccess: function(file, data, res){
                    t.showPhoto(data.response.url, data.response.uri);
                }
            });
        },
        initForm: function() {
            var t = this;
            t.form = FormValid.valid(t.$dom.find('.eh_form_valid')[0], {
                beforeCheck: function() {
                    if (t.options.hasRichEditorBox) {
                        if (t.editor.getContent() === '') {
                            EH.Alert('请输入正文', 'warning');
                            return false;
                        }
                        return true;
                    }
                },
                beforeSubmit: function() {
                    if(t.options.beforeSubmit() === false){
                        return false;
                    }
                    t.doSubmit();
                    return false;
                }
            });
        },
        doSubmit: function() {
            var t = this;

            var title = t.$dom.find('#id_fer_title').val();
            var author = t.$dom.find('#id_fer_author').val();
            var desc = t.$dom.find('#id_fer_abstract').val();

            var url = t.getPhoto().url;

            var topicContent = t.$dom.find('#id_fer_topicContent').val();
            var content = null;
            if (t.options.hasRichEditorBox) {
                content = t.editor.getContent();
            } else {
                content = t.$dom.find('#id_fer_link').val();
            }

            var embeddedJson = {
                sourceType: 1,    // 0 未知，1 论坛
                title: title,
                coverUri: url,
                contentAbstract: desc,
                content: content
            };

            if(t.options.hasLink) {
                embeddedJson['contentType'] = 'forward';  // 0 转载，1 新建
            } else {
                embeddedJson['contentType'] = 'create';
            }

            var fData = {
                forumId: t.forumId,
                subject: title,
                embeddedJson: EH.JSON.json2str(embeddedJson),
                embeddedAppId: '21',
                contentType: 'text/plain',
                content: null
            };

            t.options.onSend(fData, {
                onSendSuccess: function (data) {
                    EH.Alert('提交成功', 'success');
                }
            });
        },
        showPhoto: function(src, fileKey) {
            var t = this;
            t.$dom.find('#id_fer_abstract_photo').html('<img src="' + src + '">');
            t.$dom.find('#id_fer_abstract_photo').attr('data-resid', fileKey);
            t.$dom.find('#id_fer_abstract_photo').attr('data-respath', src);
        },
        getPhoto: function() {
            var t = this;
            return {
                uri: t.$dom.find('#id_fer_abstract_photo').attr('data-resid'),
                url: t.$dom.find('#id_fer_abstract_photo').attr('data-respath')
            };
        }

    };
    return Publish;
});