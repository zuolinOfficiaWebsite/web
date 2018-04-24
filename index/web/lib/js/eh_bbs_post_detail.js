define(function (require, exprots, module) {
    'use strict';

    var T_detail = require('lib/tpl/build/eh_bbs_post_detail');
    var EHComment = require('js/bbs_post_comment');
    var EH = require('lib/js/everhome');
    var EHB = require('lib/js/everhome_bussiness');
    var Like = require('js/forum_like');
    var Request = require('lib/js/eh_request');
    var Emoji = require('lib/js/eh_emoji');
    var Util = require('js/util');

    var $ = window.$;

    var M = function (topicId, forumId, options) {
        this.$dom = null;

        this.topicId = topicId;
        this.forumId = forumId;
        this.userId = Util.getUserInfo().userId;
        this.activityId = null;

        this.comment = null;
        this.dialog = null;

        this.detailData = null;

        this.options = $.extend({
            getTopic: function () {
            },
            listTopicComments: function () {
            },
            newComment: function () {
            },
        }, options);

    };
    M.prototype = {
        init: function () {
            var t = this;

            t.initDetail(function () {
                t.senderId = t.detailData.creatorUid;

                t.initDialog();

                if (t.detailData.embeddedAppId == '14') {
                    t.initVote();
                }

                if (t.detailData.embeddedAppId == '3') {
                    t.initActivity();
                }

                t.initComment();
                t.initLike();
                t.initEditor();
                t.bindEvent();
            });
        },
        initDetail: function (callback) {
            var t = this;

            t.options.getTopic(function (data) {
                data = t.processData(data);
                t.detailData = data;
                callback();
            });
        },
        processData: function (data) {
            data.response.p_images = [];
            //data.topic.p_richText = [];
            $.each(data.response.attachments || [], function (dex, e) {
                if (e.contentType == 'IMAGE') {
                    data.response.p_images.push(e.contentUrl);
                } else if (e.contentType == '4') {
                    data.response.p_richText.push(e);
                }
            });

            if (data.response.embeddedJson) {
                data.response.embeddedJson = EH.JSON.str2json(data.response.embeddedJson);
            }

            return data.response;
        },
        initDialog: function () {
            var t = this;

            t.$dom = $(T_detail({
                tpl: 'main',
                data: t.detailData,
                EH: EH,
                defaultAvatar: '../lib/images/defFaceImg.png'
            }));

            t.dialog = new EH.FullDialog();

            t.dialog.ready(function () {
                t.dialog.setContent(t.$dom);
            });

            t.dialog.show();

            Emoji.emojisync(t.$dom[0]);
        },
        initVote: function () {
            var t = this;

            Request.postshowResult({
                pollId: t.detailData.embeddedJson.poll.pollId
            }, function (data) {
                var all = 0;

                all = data.response.poll.pollCount;
                $.each(data.response.items, function (index, ele) {
                    if (all === 0) {
                        ele.p_progress = 0;
                    } else {
                        ele.p_progress = parseInt(ele.voteCount / all * 100, 10);
                    }
                });

                t.$dom.find('.eh_bbs_post_content_vote_container').html(T_detail({
                    tpl: 'vote',
                    data: data.response,
                    EH: EH,
                    isOwner: t.userId == t.senderId
                }));
            });


            //t.initVoteDetail();  和物业相关3.0不确定要不要做，先屏蔽
        },
        //initVoteDetail: function () {
        //    var t = this;
        //
        //    Request.postvote({
        //        pollId: t.detailData.embeddedJson.poll.pollId
        //    }, function (data) {
        //        var url = 'web/pm/vote_detail.html?topicId=' + t.topicId;
        //        t.$dom.find('.eh_bbs_post_content_vote_detail_button').html(T_detail({
        //            tpl: 'vote_detail',
        //            data: url
        //        }));
        //    }, {
        //        onerror: function () {
        //            return false;
        //        }
        //    });
        //},
        initActivity: function () {
            var t = this;

            t.activityId = t.detailData.embeddedJson.activity.activityId;

            t.$dom.find('.eh_bbs_post_content_activity_container').html(T_detail({
                tpl: 'activity',
                detailData: t.detailData,
                EH: EH,
                isOwner: t.userId == t.senderId
            }));
        },
        initLike: function () {
            var t = this;

            var likeCount = t.detailData.likeCount;
            var like = new Like(t.$dom.find('.eh_bbs_post_tool_like')[0], t.forumId, t.topicId, likeCount);
            like.init();
        },
        initComment: function () {
            var t = this;

            t.options.listTopicComments(function (data) {
                t.comment = new EHComment(t.$dom.find('.eh_bbs_post_comment_container'), data, t.forumId);
                t.comment.init();
            });
        },
        initEditor: function () {
            var t = this;

            require.async('lib/js/eh_poster', function (Poster) {
                var poster = new Poster('id_eh_bbs_post_comment_editor_container', {
                    onSend: function (data) {
                        var attachments = [];
                        if (data.images.length != 0) {
                            $.each(data.images, function (index, ele) {
                                attachments.push({
                                    contentType: 'IMAGE',
                                    contentUri: ele.uri
                                });
                            });
                        }

                        var fData = {
                            forumId: t.forumId,
                            topicId: t.topicId,
                            contentType: 'text/plain',
                            content: data.content,
                            attachments: attachments
                        };

                        t.options.newComment(fData, function (data) {
                            EH.Alert('评论成功', 'success');
                            t.initComment();
                            t.addCommentCount();
                        });
                    },
                    wordCount: false
                });
                poster.init();
            });
        },
        addCommentCount: function () {
            var t = this;

            var c = t.$dom.find('.eh_bbs_post_tool_comment');

            c.html(c.html().replace(/([0-9]+)/g, function ($1) {
                return ++$1;
            }));
        },
        bindEvent: function () {
            var t = this;

            t.$dom.on('click', '.eh_bbs_post_content_richText .panel', function () {
                window.open($(this).parent().attr('data-link'));
            });

            t.$dom.on('click', '.eh_bbs_post_content_vote_submit', function (event) {
                t.doSubmitVote();
            });

            t.$dom.on('click', '.eh_bbs_post_content_activity_submit', function (event) {
                t.doSubmitActivity();
            }).on('click', '.eh_bbs_post_content_activity_cancel_submit', function (event) {
                t.doCancelSubmitActivity();
            });

            t.$dom.on('click', '.eh_bbs_post_content_activity_detail', function () {
                var id = t.$dom.find('.eh_bbs_post_content_activity_inner').attr('data-id');
                window.open('/web/user/html/signup_checkin.html?forumId=' + t.forumId + '&topicId=' + t.topicId);
            });
        },
        doSubmitVote: function () {
            var t = this;

            var sel = [];
            var $s = t.$dom.find('.eh_bbs_post_content_vote_select');
            $s.each(function (index, ele) {
                if (ele.checked) {
                    sel.push($(ele).parent().attr('data-id'));
                }
            });
            if (sel.length === 0) {
                EH.Alert('请投票', 'warning');
                return;
            }

            Request.postvote({
                pollId: t.detailData.embeddedJson.poll.pollId,
                itemIds: sel
            }, function (data) {
                EH.Alert('投票成功', 'success');
                t.initVote();
            });
        },
        doSubmitActivity: function () {
            var t = this;

            var $ad = $(T_detail({
                tpl: 'activity_signup'
            }));
            $ad.on('keydown', 'input', function () {
                return false;
            });
            $ad.on('click', '.eh_bbs_post_content_activity_signup_dec', function () {
                var $input = $(this).parent().parent().find('.eh_bbs_post_content_activity_signup_input');
                if ($input.val() > 0) {
                    $input.val(parseInt($input.val(), 10) - 1);
                }
            });
            $ad.on('click', '.eh_bbs_post_content_activity_signup_add', function () {
                var $input = $(this).parent().parent().find('.eh_bbs_post_content_activity_signup_input');
                $input.val(parseInt($input.val(), 10) + 1);
            });

            var d = EH.Confirm($ad, function () {
                var $inputs = $ad.find('.eh_bbs_post_content_activity_signup_input');
                var adult = $inputs.eq(0).val();
                var child = $inputs.eq(1).val();
                if (adult == '0' && child == '0') {
                    EH.Alert('请检查输入项', 'warning');
                    return false;
                }

                Request.postsignup({
                    activityId: t.detailData.embeddedJson.activity.activityId,
                    adultCount: adult,
                    namespaceId: namespaseId,
                    childCount: child
                }, function (data) {
                    if (t.detailData.embeddedJson.activity.checkinFlag == '1') {
                        EH.Alert('报名成功,待活动发起人确认。', 'success');
                    } else {
                        EH.Alert('报名成功', 'success');
                    }

                    t.dialog.close();
                    t.init();
                });
            }, function () {

            }, '报名');
        },
        doCancelSubmitActivity: function () {
            var t = this;

            Request.postcancelSignup({
                activityId: t.detailData.embeddedJson.activity.activityId,
            }, function (data) {
                EH.Alert('取消成功', 'success');

                t.dialog.close();
                t.init();
            });
        }
    };

    return M;
});