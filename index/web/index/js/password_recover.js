/**
 * Created by 3fuyu on 2015/5/6.
 */

define(function (require, exports, module) {
    'use strict';

    var T = require('tpl/build/eh_password_recover');
    var Request = require('lib/js/eh_request');
    var FormValid = require('lib/js/eh_form');
    var EHB = require('lib/js/everhome_bussiness');

    var $ = window.$;

    var M = function (container) {
        this.$container = $(container);
        this.$dom = null;

        this.form = null;

        this.phone = null;
        this.newPassWord = null;
        this.verificationCode = null;
    };
    M.prototype = {
        init: function () {
            var t = this;
            t.render();
            t.initForm();
            t.bindEvent();
        },
        render: function () {
            var t = this;
            t.$dom = $(T({}));

            t.$container.html(t.$dom);
        },
        initForm: function () {
            var t = this;
            t.form = FormValid.valid(t.$dom.find('.eh_form_valid')[0], {
                beforeCheck: function () {
                    if (t.form.check(false)) {
                        return true;
                    }
                    return false;
                },
                beforeSubmit: function () {
                    t.newPassWord = t.$dom.find('#newPassWord').val();
                    t.phone = t.$dom.find('#phoneNumber').val();
                    t.verificationCode = t.$dom.find('#verificationCode').val();

                    t.verfiyAndResetPassword();

                    return false;
                }
            });
        },
        bindEvent: function () {
            var t = this;
            t.$dom.on('click', '.getVerificationCode', function () {

                t.phone = t.$dom.find('#phoneNumber').val();

                if (t.phone != '') {
                    t.sendVerifyCode();

                } else {
                    EH.Alert('请输入手机号', 'warning');
                }
            });
        },
        verfiyAndResetPassword: function () {
            var t = this;
            Request.postverfiyAndResetPassword({
                identifierToken: t.phone,
                verifyCode: t.verificationCode,
                newPassword: t.newPassWord
            }, function () {

                EH.Alert('密码重置成功', 'success');

                setTimeout(function () {
                    window.location.href = '#a=login';
                    window.location.reload();
                }, 2000);

            }, function () {

                EH.Alert('验证码不正确，请重新输入', 'warning');

                return false;
            });
        },
        sendVerifyCode: function () {
            var t = this;
            Request.postresendVerificationCodeByIdentifier({
                identifier: t.phone,
                namespaceId: EHB.namespaceId
            }, function (data) {
                EH.Alert('验证码已发送至您的手机，请注意查收', 'warning');
            }, {
                onerror: function (data) {
                    EH.Alert('获取验证码失败，请重新获取', 'warning');

                    return false;
                }
            });
        }
    };

    return M;
});