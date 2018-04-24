define(function (require, exprots, module) {

    // 个人版 服务帐号 后台管理都有在用。 如需修改该模块，需慎重。
    // 可能多个论坛的集合

    "use strict";

    require('lib/js/bootstrap_switch/bootstrap-switch.min');
    require('lib/css/bootstrap_switch/bootstrap-switch.min.css');
    var T_list = require('lib/tpl/build/eh_bbs_post_list');
    var EH = require('lib/js/everhome');
    var EHB = require('lib/js/everhome_bussiness');
    var Page = require('lib/js/eh_page');
    var Album = require('lib/js/eh_album_layer');
    var Request = require('lib/js/eh_request');
    var Emoji = require('lib/js/eh_emoji');


    var $ = window.$;
    // 数据


    var List = function (container, forumId, communityId, userId, config, options) {
        this.$container = $(container);
        // communityId 有可能是0（显示多个论坛的时候），所以尽量不要用。
        this.forumId = forumId;
        this.communityId = communityId;
        this.userId = userId;

        this.$dom = null;

        this.page = null;

        // 业务 越来越重了
        this.config = $.extend({
            // 正常模式是不出现删除按钮。
            // 物业需要有删帖功能，故物业是true.
            hasForumAdmin: false, // 引入论坛管理员模式，true 则管理员是communityId
            deleteTopic: null,
            // otherActions:[{name: '分配人员', action: 'distribute', callback: function(){}}],
            fromData: {}
        }, config);

        this.options = $.extend({
            getList: function () {
            },
            like: function () {
            },
            gotoPostDetail: function () {
            }
        }, options);

        this.data = null;
        this.labels = this.config.labels || {'label_1':'未分配','label_2':'处理中','label_3':'已完成','label_4':'已关闭'};
    };
    List.prototype = {
        init: function () {
            this.refresh();
        },
        // 函数
        initList: function (data) {
            var t = this;

            t.data = data;
            //$.each(data.results, function (index, ele) {
            //    $.each(ele.mediaFiles || [], function (index, e) {
            //        if (e.contentType === 2) {
            //            var url_temp = e.resPath.split('.');
            //            url_temp[url_temp.length - 1] = 'mp3';
            //            e.p_resPath = url_temp.join('.');
            //        }
            //    });
            //});
            t.$dom = $(T_list({
                data: t.data,
                labels:t.labels,
                userId: t.userId,
                communityId: t.communityId,
                hasForumAdmin: t.config.hasForumAdmin,
                EH: EH,
                EHB: EHB,
                options: t.config
            }));

            t.$container.html(t.$dom);

            Emoji.emojisync(t.$dom[0]);

            t.$dom.find('.eh_bbs_post_tool_like').each(function (index, e) {
                t.options.like(index, e);
            });
        },
        processStr2JsonData: function (data) {
            var pData = data || [];
            $.each(pData, function (index, ele) {
                if (index !== 'nextPageOffset' && index !== 'nextPageAnchor') {
                    $.each(ele, function (index, e) {
                        //ele.p_images = [];
                        //ele.p_richText = [];
                        //$.each(ele.mediaFiles || [], function (dex, e) {
                        //    if (e.contentType == '1') {
                        //        ele.p_images.push(e.resPath);
                        //    } else if (e.contentType == '4') {
                        //        ele.p_richText.push(e);
                        //    }
                        //});

                        if (e.embeddedJson) {
                            e.embeddedJson = EH.JSON.str2json(e.embeddedJson);
                        }

                    });
                }
            });
            return pData;
        },
        processData: function (data) {
            var t = this;

            var pData = [];

            $.each(data, function (index, ele) {
                if (index !== 'nextPageOffset' && index !== 'nextPageAnchor') {
                    $.each(ele, function (index, e) {
                        pData.push(e);
                    });
                }
            });

            return pData;
        },
        deletePost: function (event) {
            var t = this;
            var $target = $(event.target).parents('li');
            if (t.config.deleteTopic) {
                var delTopicWeb = t.config.deleteTopic;
                if (EH.confirm("您确定删除吗？") === true) {
                    $.ajax({
                        url: delTopicWeb,
                        data: {
                            topicId: $target.attr('data-topicid')
                        },
                        type: 'post',
                        success: function (data) {
                            if (data.errCode === 0) {
                                $target.fadeOut();
                            } else {
                                EH.Alert("删除失败，错误原因：" + data.errDesc, 'warning');
                            }
                        },
                        error: function () {
                            EH.Alert("删除失败", 'warning');
                        }
                    });
                }
            } else {
                var delTopicWeb = "/w/delTopicWeb";
                if (EH.confirm("您确定删除吗？") === true) {
                    $.ajax({
                        url: delTopicWeb,
                        data: {
                            topicId: $target.attr('data-topicid'),
                            forumId: $target.attr('data-forumid')
                        },
                        type: 'post',
                        success: function (data) {
                            if (data.errCode === 8251) {
                                $target.fadeOut();
                            } else {
                                EH.Alert("删除失败，错误原因：" + data.errDesc, 'warning');
                            }
                        },
                        error: function () {
                            EH.Alert("删除失败", 'warning');
                        }
                    });
                }
            }
        },
        checkImages: function (event) {
            var index = $(event.target).parents('li').attr('data-index');
            var d = this.data[index];

            if (!d.attachments || d.attachments.length === 0) {
                return;
            }

            var images = [];
            $.each(d.attachments, function (index, ele) {
                if (ele.contentType === 'IMAGE' || ele.contentType === 'image') {
                    images[index] = ele.contentUrl;
                }
            });

            var album = new Album.getLayer(images, images);
            album.init();
        },
        viewRT: function (link) {
            window.open(link);
        },
        onOtherAction: function (event) {
            var t = this;
            var action = $(event.target).attr('data-action');
            $.each(t.config.otherActions, function (index, ele) {
                if (ele.action === action) {
                    if (ele.callback) {
                        ele.callback(event);
                        return false;
                    }
                }
            });
        },
        controlSound: function () {
            var t = this;
            var $soundDom = t.$dom.find('.eh_media_sound');
            if ($soundDom.length !== 0) {
                require.async(['js/eh_sound'], function (EhSound) {
                    $soundDom.each(function (index, ele) {
                        var e = new EhSound.ControlSound(ele);
                        e.init();
                    });

                });
            }
        },
        initEvent: function () {
            var t = this;
            t.$dom.on('click', '.eh_bbs_post_tool_comment', function (event) {
                t.options.gotoPostDetail(event);
            }).on('click', '.eh_bbs_post_tool_detail', function (event) {
                t.options.gotoPostDetail(event);
            }).on('click', '.eh_bbs_post_tool_delete', function (event) {
                t.deletePost(event);
            }).on('click', '.eh_bbs_post_content_img', function (event) {
                t.checkImages(event);
            }).on('click', '.eh_bbs_post_content_richText .panel', function (event) {
                t.viewRT($(this).parent().attr('data-link'));
            }).on('click', '.eh_bbs_post_content_vote_detail', function (event) {
                t.options.gotoPostDetail(event);
            }).on('click', '.eh_bbs_post_content_activity_detail', function (event) {
                t.options.gotoPostDetail(event);
            }).on('click', '.eh_bbs_post_other_action button', function (event) {
                t.onOtherAction(event);
            }).on('switchChange.bootstrapSwitch', function (event, state) {
                t.setVisible(event, state);
            });
        },
        initVisible: function () {
            var t = this;

            t.$dom.find('.eh_bbs_post_head input[name="eh-switch-size"]').bootstrapSwitch();
            t.$dom.find('.bootstrap-switch').addClass('eh_switch');
        },
        setVisible: function (event, state) {
            var t = this;

            var topicId = $(event.target).closest('li').attr('data-topicid');

            EH.Confirm('确认' + (state ? '公开' : '不公开') + '该贴吗？', function () {
                Request.postupdateTopicPrivacy({
                    organizationId: t.organizationId,
                    forumId: t.forumId,
                    topicId: topicId,
                    privacy: state ? '0' : '1'
                }, function (data) {
                    EH.Alert('设置成功', 'success');
                });
            }, function () {
                $(event.target).bootstrapSwitch('state', !state, true);  // $(target).bootstrapSwitch(options, value, skip)
            }, '帖子公开确认');
        },
        initPage: function (callback) {
            var t = this;

            t.page = new Page(t.$container.siblings('.eh_bbs_post_page')[0], {
                getData: function (next) {
                    t.options.getList(next, function (data) {
                        return t.processData(data.response);

                    }, function (data) {
                        var pData = t.processStr2JsonData(data.response);

                        t.initList(t.page.processData(pData));

                        callback();
                    });
                }
            });

            t.page.init();

        },
        refresh: function (callback) {
            var t = this;
            t.$container.html('');

            t.initPage(function () {
                t.controlSound();
                t.initVisible();
                t.initEvent();
                callback && callback();
            });

        }
    };

    return List;
});