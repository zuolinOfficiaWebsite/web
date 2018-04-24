define(function (require, exports, module) {

    'use strict';

    var Poster = require('lib/js/eh_poster');
    var EH = require('lib/js/everhome');

    var Create = function (id, forumId, userId, communityId, options) {
        this.id = id;
        this.$container = $('#' + id);
        this.poster = null;
        this.forumId = forumId;
        this.userId = userId;
        this.communityId = communityId;
        this.options = $.extend({
            onSend: function () {

            }
        }, options);
    };
    Create.prototype = {
        init: function () {
            var t = this;
            t.initPoster();
        },
        initPoster: function () {
            var t = this;
            t.poster = new Poster(t.id, {
                tops: ['title'],
                otherActionDesc: '发其他贴',
                otherActions: [{
                    name: '投票',
                    action: 'vote',
                    callback: function () {
                        t.goSendVote();
                    }
                }, {
                    name: '活动',
                    action: 'activity',
                    callback: function () {
                        t.goSendActivity();
                    }
                }, {
                    name: '图文',
                    action: 'richText',
                    callback: function () {
                        t.goSendRichText({
                            hasRichEditorBox: true,
                            hasLink: false
                        });
                    }
                }, {
                    name: '链接',
                    action: 'link',
                    callback: function () {
                        t.goSendRichText({
                            hasRichEditorBox: false,
                            hasLink: true
                        });
                    }
                }],
                onSend: function (data) {
                    t.onSendShare(data);
                },
                autoSave: true,
                enableRange: false
            });
            t.poster.init();
        },
        onSendShare: function (data) {
            var t = this;

            if (t.forumId) {
                var attachments = [];
                if (data.images.length !== 0) {
                    $.each(data.images, function (index, ele) {
                        attachments.push({
                            contentType: 'image',
                            contentUri: ele.uri
                        });
                    });
                }

                var fData = {
                    forumId: t.forumId,
                    subject: data.title,
                    contentType: 'text/plain',
                    content: data.content,
                    attachments: attachments
                };

                t.options.onSend(fData, {
                    onSendSuccess: function () {
                        EH.Alert('发表成功', 'success');
                    }
                });
            } else {
                EH.Alert('未选择圈', 'warning');
            }
        },
        goSendVote: function () {
            var t = this;
            require.async([
                'lib/js/eh_forum_editor_vote',
            ], function (FEV) {
                var dialog = new EH.FullDialog();
                dialog.ready(function () {
                    var $dom = $('<div class="fix_service_account_forum_editor"></div>');
                    dialog.setContent($dom);
                    
                    var fea = new FEV($dom[0], {
                        forumId: t.forumId,
                        needPhotoSelect: false,
                        id:t.id,
                        onSend: function (fData, options) {
                        	fData.categoryId = 1011;
                            t.options.onSend(fData, {
                                onSendSuccess: function (data) {
                                    options.onSendSuccess(data);
                                    dialog.close();
                                }
                            });
                        },
                    });
                    fea.init();

                });
                dialog.show();
            });
        },
        goSendActivity: function () {
            var t = this;
            require.async([
                'lib/js/eh_forum_editor_activity',
            ], function (FEA) {
                var dialog = new EH.FullDialog();

                dialog.ready(function () {
                    var $dom = $('<div class="fix_service_account_forum_editor"></div>');
                    dialog.setContent($dom);

                    var fea = new FEA($dom[0], {
                        forumId: t.forumId,
                        needPhotoSelect: false,
                        id:t.id,
                        onSend: function (fData, options) {
                        	fData.categoryId = 1010;
                            t.options.onSend(fData, {
                                onSendSuccess: function (data) {
                                    options.onSendSuccess(data);
                                    dialog.close();
                                }
                            });
                        }
                    });
                    fea.init();

                });
                dialog.show();
            });
        },
        goSendRichText: function (value) {
            var t = this;
            require.async([
                'lib/js/eh_forum_editor_richtext',
            ], function (FER) {
                var dialog = new EH.FullDialog();
                dialog.ready(function () {
                    var $dom = $('<div class="fix_service_account_forum_editor"></div>');
                    dialog.setContent($dom);

                    var fer = new FER($dom[0], {
                        forumId: t.forumId,
                        hasRichEditorBox: value.hasRichEditorBox,
                        hasLink: value.hasLink,
                        onSend: function (fData, options) {
                        	fData.categoryId = 1001;
                            t.options.onSend(fData, {
                                onSendSuccess: function (data) {
                                    options.onSendSuccess(data);
                                    dialog.close();
                                }
                            });
                        }
                    });
                    fer.init();

                });
                dialog.show();
            });
        }
    };

    return Create;
});
