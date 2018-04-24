define(function (require, exports, module) {

    'use strict';

    var EH = require('lib/js/everhome');
    var Request = require('lib/js/eh_request');
    var FormValid = require('lib/js/eh_form');

    var Application = function (application) {

        this.form = null;
    };
    Application.prototype = {
        init: function () {
            var t = this;
            t.render();

        },
        render: function () {
            var t = this;
            t.initForm();
        },
        getVerificationCode:function(phonenum){
            Request.postsendVerificationCode({
                applicantPhone: phonenum
            }, function (data) {
                EH.Alert('已发送', 'success');
            });
        },
        submitApplication: function (name, companyname, phonenum, email, verificationcode) {
            Request.postaddVideoconfApplication({
                applicantName: name,
                applicantCompany: companyname,
                applicantPhone: phonenum,
                applicantEmail: email,
                verificationCode: verificationcode
            }, function (data) {
                EH.Alert('提交成功', 'success');
            });
        },
        bindApplicationEvent: function () {
            var t = this;
            $('.apply-btn').on('click', function () {
                var name = $('.name').val();
                var companyname = $('.company_name').val();
                var phonenum = $('.phonenum').val();
                var email = $('.email').val();
                var verificationcode = $('.verification_code').val();
                t.submitApplication(name, companyname, phonenum, email, verificationcode);
            });
            $('.apply-co-meet-account').on('click', '.send-message-code', function () {
                var phonenum = $('.phonenum').val();
                t.getVerificationCode(phonenum);
            });
        },

        initForm: function () {
            var t = this;
            t.form = FormValid.valid($('.eh_form_valid')[0], {
                beforeSubmit: function () {
                    t.bindApplicationEvent();
                    return false;
                }
            });
        }
    };

    return Application;
});

