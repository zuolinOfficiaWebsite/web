define(function (require, exports, module) {
    'use strict';

    var T = require('lib/tpl/build/eh_message');
    var EHB = require('lib/js/everhome_bussiness');
    var Poster = require('lib/js/eh_poster');

    var $ = window.$;

    var M = function (container, config) {
        this.$container = $(container);
        this.$dom = null;

        this.config = $.extend({
            forumId: null,
            userId: null
        }, config);
    };
    M.prototype = {
        init: function () {
            var t = this;
            t.render();
            t.renderMessage();
            t.initPost();
            t.bindEvent();
            //t.initSetTimeout();
        },
        initSetTimeout: function () {
            var t = this;
            setTimeout(function () {
                t.refresh();
                t.initSetTimeout();
            }, 5000);
        },
        render: function () {
            var t = this;
            t.$dom = $(T({
                tpl: 'main'
            }));

            t.$container.html(t.$dom);
        },
        renderMessage: function () {
            var t = this;
            EHB.Request.getqueryNoteDetail({
                forumId: t.config.forumId
            }, function (data) {
                t.$dom.find('.eh_message_list_box').html(T({
                    tpl: 'list',
                    data: data.results || [],
                    config: t.config,
                    EH: EHB.EH
                }));

                t.$dom.find('.eh_message_list')[0].scrollTop = t.$dom.find('.eh_message_list_box').height() - t.$dom.find('.eh_message_list').height();
            });
        },
        initPost: function () {
            var t = this;
            var poster = new Poster('id_eh_message_poster', {
                onSend: function (data) {
                    t.onSend(data.content);
                },
                face: false,
                image: 0,
                buttonText: '发送',
                wordCount: false
            });
            poster.init();
        },
        onSend: function (content) {
            var t = this;
            t.refresh();
            // TODO
            //EHB.Request.postsendNote({
            //    forumId: t.config.forumId,
            //    message: {
            //        content: content,
            //        contentType: 'text',
            //        createTime: -1, // unknow
            //        destComponent: 1, // unknow
            //        from: {
            //            belongTo: -1,
            //            tag: '',
            //            targetAvatar: EHB.
            //        }
            //    },
            //    versionType: 2 // unknow
            //});
        },
        bindEvent: function () {
            var t = this;
        },
        refresh: function () {
            var t = this;
            t.renderMessage();
        }
    };

    return M;
});