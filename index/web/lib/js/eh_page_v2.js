define(function(require, exports, module){
    'use strict';
    var T_page = require('lib/tpl/build/eh_page_v2');
    var EverHome = require('lib/js/everhome');
    var $ = window.$;

    var Page = function(container, pageall, pageindex, callback, option) {
        this.$dom = null;
        this.$container = $(container);
        this.pageall = pageall;
        this.pageindex = pageindex;
        this.callback = callback || function() {};

        this.option = $.extend({
           jump : true // 是否有 page 跳转模块
        }, option);

    };
    Page.prototype = {
        init: function() {
            this.render();
            this.bindEvent();
        },
        initByPagination: function (pagination) {
            var t = this;
            if(pagination){
                t.pageindex = pagination.currentPage || 1;
                t.pageall = pagination.totalPage || 0;
                t.init();
            }
        },
        render: function() {

            var arr = [];
            var min = Math.max(this.pageindex - 2, 1);

            for(var i = min; i < min + 5 && i <= this.pageall; i ++){
                arr.push(i);
            }

            this.$dom = $(T_page({
                data: {
                    pageall: this.pageall,
                    pageindex: this.pageindex,
                    page: arr,
                    option: this.option
                }
            }));
            this.$container.html(this.$dom);

        },
        bindEvent: function() {
            var t = this;
            t.$dom.on('click', 'a', function(event) {
                var $a = $(this);
                if($a.parent().hasClass('disabled') || $a.parent().hasClass('active')){
                    return;
                }
                var type = $a.attr('data-type');
                var index = t.pageindex;
                if (type == 'pre') {
                    if (index != 1) {
                        index--;
                    }
                } else if (type == 'next') {
                    if (index != t.pageall) {
                        index++;
                    }
                } else {
                    index = ~~type;
                }
                t.gotoPage(index);
            });

            t.$dom.on('click', '.eh_page_v2_nav_option_ok', function() {
                var $input = t.$dom.find('.eh_page_v2_nav_option_input');
                var val = EverHome.string.trim($input.val());
                if (val !== "") {
                    var result = val.match(/^[0-9]+/g);
                    if (result && result[0] > 0 && result[0] <= t.pageall) {
                        t.gotoPage(result[0]);
                    }
                }
            });

            t.$dom.on('keydown', '.eh_page_v2_nav_option_input', function(event){
                if(event.keyCode === 13){
                    var $input = t.$dom.find('.eh_page_v2_nav_option_input');
                    var val = EverHome.string.trim($input.val());
                    if (val !== "") {
                        var result = val.match(/^[0-9]+/g);
                        if (result && result[0] > 0 && result[0] <= t.pageall) {
                            t.gotoPage(result[0]);
                        }
                    }
                }
            });
        },
        gotoPage: function(index) {
            if (index == this.pageindex) {
                return;
            }
            this.pageindex = index;
            this.callback(index);
            this.render();
        },
        setPage: function(pageall, pageindex) {
            this.pageall = pageall;
            this.pageindex = pageindex;
            this.render();
        }
    };

    return Page;
});