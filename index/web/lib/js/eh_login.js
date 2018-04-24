define(function (require, exports, module) {

    // 建议使用EHB.Login()。 不建议直接使用
    'use strict';

    var EH = require('lib/js/everhome');
    var EHB = require('lib/js/everhome_bussiness');
    var T_Login = require('lib/tpl/build/eh_login');
    var Request = require('lib/js/eh_request');
    var Storage = require('lib/js/eh_storage');
    var $ = window.$;

    var Login = function (config) {

        this.config = $.extend({
            type: 'dialog',
            container: null
        }, config);

        if (this.config.container) {
            this.$container = $(this.config.container);
        }

        this.$dom = null;

        this.dialog = null;

        this.onLogin = null;
    };
    Login.prototype = {
        init: function () {
            var t = this;
            t.render();
            t.bindEvent();

            var sp = t.userIdentifierStorage();
            t.$dom.find('#id_eh_login_phone').val(sp);
            if (sp) {
                t.$dom.find('#id_eh_login_password').focus();
            } else {
                t.$dom.find('#id_eh_login_phone').focus();
            }
        },
        login: function (callback) {
            var t = this;
            t.onLogin = callback;
        },
        isValid: function () {
            var t = this;
            return t.dialog.isValid();
        },
        render: function () {
            var t = this;

            t.$dom = $(T_Login({
                tpl: t.config.type
            }));

            if (t.config.type == 'dialog') {
                t.dialog = new EH.Dialog({
                    title: '登录',
                    content: t.$dom,
                    mask: true,
                    close: true
                });
                t.dialog.show();

            } else if (t.$container) {
                t.$container.html(t.$dom);
            }
        },
        bindEvent: function () {
            var t = this;
            t.$dom.on('click', '.eh_login_submit', function () {
                t.doSubmit();
            });

            t.$dom.on('keydown', 'form', function (event) {
                if (event.keyCode === 13) {
                    t.doSubmit();
                }
            });
        },
        userIdentifierStorage: function (value) {
            if (value === undefined) {
                return Storage.get(Storage.KEY.EH_LOGIN_USER);
            } else {
                Storage.set(Storage.KEY.EH_LOGIN_USER, value);
            }
        },
        contentServerStorage: function (value) {
            EHB.GlobalConfig.setContentServer(value);
        },
        doSubmit: function () {
            var t = this;
            var userIdentifier = EH.string.trim(t.$dom.find('#id_eh_login_phone').val());
            var password = EH.string.trim(t.$dom.find('#id_eh_login_password').val());

            //0720e749299b5ebad6afca1dcbf4e031e1013cf23e75b5178d57dada71be9781

            // 园区版做差异化
            if (EHB.PlateManager.isParkPlate()) {
                Request.postparklogin({
                    name: phone,
                    password: EH.string.sha256(password)
                }, function () {

                    t.userIdentifierStorage(phone);

                    if (t.onLogin) {
                        t.onLogin();
                    }
                });
            } else {

                Request.postlogon({
                    userIdentifier: userIdentifier,
                    namespaceId: EHB.namespaceId,
                    password: EH.string.sha256(password)
                }, function (data) {

                    t.userIdentifierStorage(userIdentifier);

                    t.contentServerStorage(data.response.contentServer);

                    if (t.onLogin) {
                        t.onLogin();
                    }
                }, {
                    onerror: function () {
                        EH.Alert('用户名或者密码错误', 'warning');
                        t.$dom.find('#id_eh_login_password').val('');
                    }
                });
            }
        }
    };

    return Login;
});