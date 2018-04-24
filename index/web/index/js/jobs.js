define(function (require, exports, module) {
    'use strict';

    var T = require('tpl/build/tab_jobs');
    var Config = require('config/jobs_config');

    var $ = window.$;

    var M = function (container) {
        this.$container = $(container);
        this.$dom = null;
    };
    M.prototype = {
        init: function () {
            var t = this;

            t.$dom= $(T({
                data:Config
            }));

            t.$container.html(t.$dom);
            t.$dom.find('._tab a:first').click();
        }
    };

    return M;
});