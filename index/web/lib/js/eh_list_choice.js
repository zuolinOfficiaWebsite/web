define(function(require, exports, module){
    'use strict';
    var T_choice = require('lib/tpl/build/eh_list_choice');
    var EH = require('lib/js/everhome');

    var $ = window.$;

    var Choice = function(container, option){
        this.$container = $(container);
        this.$dom = null;

        this.option = $.extend({
            count: 0 // 0 代表不限制
        }, option);
    };
    Choice.prototype = {
        init: function(){
            var t = this;
            t.render();
            t.bindEvent();
        },
        render: function(){
            var t = this;
            t.$dom = $(T_choice({
                tpl: 'main'
            }));
            t.$container.html(t.$dom);
        },
        setList: function(arr){
            // arr 要求严格
            var t = this;
            t.$dom.find('.eh_list_choice_option').html(T_choice({
                tpl: 'list',
                data: arr
            }));
        },
        choiceAll: function(){
            var t = this;
            t.$dom.find('.eh_list_choice_choiced').html(t.$dom.find('.eh_list_choice_option').html());
        },
        addChoiced: function(d){
            var t = this;
            var key = d.attr('data-key');
            var $c = t.$dom.find('.eh_list_choice_choiced');
            if($c.find('a[data-key="' + key + '"]').length === 0){
                $c.append(d);
            }else{
                EH.Alert('已选', 'info', {time:1000});
            }
        },
        bindEvent: function(){
            var t = this;
            t.$dom.on('click', '.eh_list_choice_option a', function(){
                t.addChoiced($(this).clone());
            });

            t.$dom.on('click', '.eh_list_choice_choiced span', function(){
                $(this).parent().remove();
            });
        },
        getList: function(){
            var t = this;
            var arr = [];
            t.$dom.find('.eh_list_choice_choiced a').each(function(){
                arr.push({
                    key:$(this).attr('data-key'),
                    name: $(this).attr('data-name')
                });
            });
            return arr;
        }
    };


    return Choice;
});