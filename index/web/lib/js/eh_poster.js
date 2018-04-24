define(function (require, exports, module) {
    'use strict';

    var T_poster = require('lib/tpl/build/eh_poster');
    var Editor = require('lib/js/eh_editor');
    var Face = require('lib/js/eh_face');
    var Upload = require('lib/js/eh_upload');
    var ImagePreview = require('lib/js/eh_image_preview');

    var EH = require('lib/js/everhome');

    var Poster = function (id, options) {
        this.id = id;
        this.$container = $('#' + id);
        this.$dom = null;

        this.editor = null;
        this.face = null;
        this.imagePreview = null;
        this.upload = null;

        this.options = $.extend({
            tops: [], // ['title']
            // otherActionDesc: '发其他贴',
            // otherActions: [{name: '投票', action: 'vote', callback: function(){}}, {name: '活动', action: 'activity', callback: function(){}}],
            autoSave: false, // 自动保存会根据编辑器id做key保存
            enableRange: false,
            enableContentEmpty: false,
            onSend: function (data) {
            },
            face: true,
            image: 9, // num 0 代表取消该功能
            buttonText: '发布',
            wordCount: true
        }, options);
    };
    Poster.prototype = {
        init: function () {
            var t = this;
            t.render();
            t.initEditor();
            if (t.options.face) {
                t.initFace();
            }
            if (t.options.image) {
                t.initImagePreview();
                t.initUpload();
            }
            t.bindEvent();
        },
        render: function () {
            var t = this;
            t.$dom = $(T_poster({
                data: {
                    id: t.id
                },
                options: t.options
            }));
            t.$container.html(t.$dom);
        },
        initEditor: function () {
            var t = this;
            t.editor = Editor.eh_getPlainTxtEditor('__id_eh_poster_' + t.id, {
                enableAutoSave: t.options.autoSave,
                wordCount: t.options.wordCount
            });
            t.editor.ready(function () {
                // 取之前的
                if (t.options.autoSave) {
                    t.editor.setContent(t.editor.execCommand('getlocaldata'));
                }
            });
        },
        initFace: function () {
            var t = this;
            t.face = new Face.FaceLayer(t.$dom.find('.eh_poster_tools_icon_face')[0], {
                close: false,
                behavior: 'click'
            }, function (key, img) {
                var $img = $(img);
                $img.attr('data-emoji', key);
                t.editor.execCommand('inserthtml', $img[0].outerHTML);
            });
        },
        initImagePreview: function () {
            var t = this;
            t.imagePreview = new ImagePreview(t.$dom.find('.eh_poster_image_container')[0], {
                limit: t.options.image
            });
            t.imagePreview.init();
        },
        initUpload: function () {
            var t = this;
            Upload.getImageUploadDelay($('#__id_eh_poster_image_' + t.id)[0], {
                multi: false, // 多选还是有挺多问题需要考虑。 先取消
                width: 30,
                height: 25,
                buttonText: '&nbsp;',
                // queueID: '__id_eh_poster_image_' + t.id + '-queue',
                buttonClass: 'eh_upload_button_lucency'
            }, {
                onInit: function () {
                    $(t.upload.getQueue()).hide();
                },
                onSuccess: function (file, data, res) {
                    //$.each(data.response, function (index, ele) {
                    //    t.imagePreview.add(ele.uri, ele.url);
                    //});
                    // 不知道为什么用数组，暂时干掉
                    t.imagePreview.add(data.response.uri, data.response.url);
                }
            }, {
                callback: function (upload) {
                    t.upload = upload;
                }
            });
        },
        bindEvent: function () {
            var t = this;
            t.$dom.on('click', '.eh_poster_send_ok', function () {
                var data = {
                    content: t.getContent(),
                    images: t.getImages(),
                    title: t.getTitle(),
                    range: t.getRange()
                };
                if (!t.options.enableContentEmpty && data.content === '') {
                    EH.Alert('内容为空', 'info');
                    return;
                }
                if (t.options.onSend(data) !== false) {
                    t.clear();
                }
            });
            t.$dom.on('click', '.eh_poster_range li a', function () {
                t.setRange($(this).attr('data-value'));
            });
            t.$dom.on('click', '.eh_poster_other_action li a', function () {
                var action = $(this).attr('data-action');
                t.doOtherAction(action);
            });
        },
        doOtherAction: function (action) {
            var t = this;
            $.each(t.options.otherActions, function (index, ele) {
                if (ele.action === action) {
                    ele.callback();
                    return false;
                }
            });
        },
        clear: function () {
            var t = this;
            if (t.options.tops && t.options.tops.indexOf('title') > -1) {
                t.setTitle('');
            }
            t.editor.setContent('');
            if (t.imagePreview) {
                t.imagePreview.close();
            }
        },
        getTitle: function () {
            var t = this;
            var $title = t.$dom.find('.eh_poster_title');
            if ($title.length > 0) {
                return $title.val();
            }
            return null;
        },
        setTitle: function (value) {
            var t = this;
            t.$dom.find('.eh_poster_title').val(value);
        },
        getRange: function () {
            var t = this;
            if (t.options.enableRange) {
                return t.$dom.find('.eh_poster_range button').attr('data-value');
            }
            return null;
        },
        setRange: function (value) {
            var t = this;
            var $btn = t.$dom.find('.eh_poster_range button');
            if(value === undefined){
                value = 1;
            }
            $btn.attr('data-value', value);
            $btn.find('span:first').html(t.$dom.find('.eh_poster_range a[data-value="' + value + '"]').html());
        },
        getContent: function () {
            var t = this;
            // 没输入任何东西的时候 是 \n
            var con = t.editor.getPlainTxt();
            if (con === '\n') {
                return '';
            }
            // 把emoji img 替换成 文本
            if(t.options.face){
                con = con.replace(/<img[\w\W]+?data-emoji="(\W+)"[\w\W]+?>/g, '$1');
            }
            return con;
        },
        getImages: function () {
            var t = this;
            if (t.imagePreview) {
                return t.imagePreview.get();
            }
            return [];
        }
    };


    return Poster;
});
