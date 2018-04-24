define(function (require, exports, module) {

    "use strict";

    var EHB = require('lib/js/everhome_bussiness');
    var EH = require('lib/js/everhome');

    var M = function (container) {
        this.config = {
            type: 'index',
            container: $(container)
        };
    };

    M.prototype = {
        init: function () {
            var t = this;
            EHB.Login(function () {
                EH.Alert('登录成功', 'success');
                window.location.href = '../user/index.html';
            }, t.config);
        }
    };

    return M;
});