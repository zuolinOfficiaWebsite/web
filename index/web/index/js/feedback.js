/**
 * Created by yaotenghui on 2015/7/29.
 */

define(function (require, exports, module) {

    'use strict';

    var EH = require('lib/js/everhome');
    var Request = require('lib/js/eh_request');
    var FormValid = require('lib/js/eh_form');

    var Feedback = function (container) {

        this.form = null;
    };
    Feedback.prototype = {
        init: function () {
            var t = this;
            t.render();

        },
        render: function () {
            var t = this;
            t.initForm();
        },
        submitFeedback: function (feedbackSubject, feedbackDetail,contact) {
            var t = this;
            Request.postfeedback({
                feedbackType:0,
                targetType:0,
                contentCategory:0,
                subject:feedbackSubject,
                content:feedbackDetail,
                contact:contact
            }, function (data) {
                console.log(data);
                EH.Alert('提交成功','success');
            });
        },
        bindFeedbackEvent: function () {
            var t = this;
            $('.hzy_btn').on('click', function () {
                var feedbackSubject = $('.feedback_subject').val();
                var feedbackDetail = $('.feedback_detail').val();
                var contact = $('.feedback_contact').val();

                        t.submitFeedback(feedbackSubject, feedbackDetail, contact);

            });
        },
        initForm: function () {
            var t = this;
            t.form = FormValid.valid($('.eh_form_valid')[0], {
                beforeSubmit: function () {
                    t.bindFeedbackEvent();
                    return false;
                }
            });
        },
    };
    return Feedback;
});
