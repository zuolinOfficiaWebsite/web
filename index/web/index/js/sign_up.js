/**
 * Created by 3fuyu on 2015/5/5.
 */
define(function (require, exports, module) {
    'use strict';

    var T = require('tpl/build/eh_sign_up');
    var Request = require('lib/js/eh_request');
    var FormValid = require('lib/js/eh_form');
    var EH = require('lib/js/everhome');

    var $ = window.$;

    var M = function (container) {
        this.$container = $(container);
        this.$dom = null;

        this.form = null;

        this.accountName = null;
        this.phone = null;
        this.passWord = null;
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
                    t.accountName = t.$dom.find('#userName').val();
                    t.password = t.$dom.find('#passWord').val();
                    t.phone = t.$dom.find('#phoneNumber').val();
                    t.verificationCode = t.$dom.find('#verificationCode').val();

                    var invitationCode = t.$dom.find('#invitationCode').val();
                    t.verifyIdentity();

                    return false;
                }
            });
        },
        bindEvent: function () {
            var t = this;
            t.$dom.on('click', '.getVerificationCode', function () {
                t.phone = t.$dom.find('#phoneNumber').val();
                if (t.phone != '') {
                    t.signUpPhone();
                } else {
                    EH.Alert('请输入手机号', 'warning');
                }
            });
        },
        verifyIdentity: function () {
            var t = this;
            Request.postverifyAndLogonByIdentifier({
                userIdentifier: t.phone,
                verificationCode: t.verificationCode,
                initialPassword: EH.string.sha256(t.password)
            }, function () {
                t.signUpUserName();
            }, function () {
                EH.Alert('验证码不正确，请重新输入', 'warning');
                return false;
            });
        },
        signUpUserName: function () {
            var t = this;
            Request.postsetUserAccountInfo({
                accountName: t.accountName,
                password: EH.string.sha256(t.password)
            }, function () {
                EH.Alert('注册成功', 'success');
                setTimeout(function () {
                    window.location.href = '#a=login';
                    window.location.reload();
                }, 2000);
            });
        },
        signUpPhone: function () {
            var t = this;
            Request.postuserSignup({
                type: 'mobile',   // 暂时只允许电话号，不允许邮箱
                token: t.phone
            }, function (data) {
                setTimeout(function () {
                    EH.Alert('验证码已发送至您的手机，请注意查收', 'warning');
                }, 2000);
            }, {
                onerror: function (data) {
                    if (data.errorCode === 10011) {
                        EH.Alert('该手机号已被注册，请重新输入', 'warning');
                    }
                    else if (data.errorCode === 500){
                        EH.Alert('左邻已经向该手机发过验证码，请您查看短信记录', 'warning');
                    }
                    else {
                        EH.Alert('获取验证码失败，请重新获取', 'warning');
                    }
                    return false;
                }
            });
        }
    };

    return M;
});