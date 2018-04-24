define(function(require, exports, module){

    'use strict';

    var T_B = require('lib/tpl/build/eh_breadcrumb');
    var $ = window.$;

    var BreadCrumb = function(container, data){
        this.$container = $(container);
        this.$dom = $('<div></div>');

        this.data = data || [];

        this.onchangeList = [];
    };
    BreadCrumb.prototype = {
        init: function(){
            var t = this;
            t.$container.html(t.$dom);
            t.render();
            t.bindEvent();
        },
        change: function(callback){
            var t = this;
            t.onchangeList.push(callback);
        },
        render: function(){
            var t = this;
            t.$dom.html($(T_B({
                data: t.data
            })));
        },
        bindEvent: function(){
            var t = this;
            t.$dom.on('click', 'a', function(event){
                var key = $(this).parent().attr('data-key');
                t.popWhat(key);
                $.each(t.onchangeList, function(index, ele){
                    ele(key);
                });
            });
        },
        push: function(key, value){
            var t = this;
            t.data.push({
                key: key,
                value: value
            });
            t.render();
        },
        popWhat: function(key){
            var t = this;
            $.each(t.data, function(index, ele){
                if(ele.key == key){
                    t.data = t.data.slice(0, index + 1);
                    t.render();
                    return false;
                }
            });
        },
        pop: function(){
            var t = this;
            t.data.pop();
            t.render();
        },
        clear: function(){
            var t = this;
            t.data = [];
            t.render();
        }
    };


    return BreadCrumb;

});