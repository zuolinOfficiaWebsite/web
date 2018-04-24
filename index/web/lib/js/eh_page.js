define(function(require, exports, module){
    'use strict';
    var T_page = require('lib/tpl/build/eh_page');
    var EH = require('lib/js/everhome');

    var Page = function (container, options) {
        this.$container = $(container);
        this.$dom = null;

        this.next = null;

        this.pData = [];

        this.options = $.extend({
            getData: function () {}
        },options);
    };

    Page.prototype = {
        init: function () {
            var t = this;

            t.getData();
        },
        getData: function () {
            var t = this;

            t.options.getData(t.next);
        },
        processData: function (data) {
            var t = this;

            t.next = null;

            $.each(data, function (index, ele) {
                if(index !== 'nextPageOffset' && index !== 'nextPageAnchor') {
                    $.each(ele, function (index, e) {
                        t.pData.push(e);
                    });
                } else {
                    t.next = ele;
                }
            });

            t.render();

            EH.Alert.clear();

            return t.pData;
        },
        render: function () {
            var t = this;

            t.$dom = $(T_page({
                next: t.next
            }));

            t.$container.html(t.$dom);

            t.bindEvent();
        },
        bindEvent: function () {
            var t = this;

            t.$dom.on('click', '.eh_page_nav_main button', function () {
                EH.Alert('正在加载中，请稍后。。。', 'warning', {time:5000});
                t.getData();
            });
        },
        refreshData: function () {
            var t = this;

            t.pData = [];  //重新初始化
        }
    };

    return Page;
});