define(function(require, exports, module){
    'use strict';
    var T_cbd = require('lib/tpl/build/eh_select_city_building_door');
    var EH = require('lib/js/everhome');
    var ListChoice = require('lib/js/eh_list_choice');
    var AddressFilter = require('lib/js/eh_address_filter');

    var $ = window.$;

    var CBD = function(container, callback, options){
        this.$container = $(container);
        this.$dom = null;

        this.listChoice = null;
        this.addressFilter = null;

        this.type = 1;

        this.callback = callback || function(){};
        this.options = $.extend({
            tab0: {},
            tab1: {},
            tab2: {},
            tab3: {},
            tab4: {},
            buttonText: '确定'
            // community: {
            //     key: 24210090697429170,
            //     name: 'xxx小区'
            // }
            // tabx: false
        }, options);
    };
    CBD.prototype = {
        init: function(){
            var t = this;
            t.render();
            t.bindEvent();

            // var type = t.$dom.find('.eh_select_cbd_tab li.active a').attr('data-type');
            // if(type === undefined){
            //     type = t.$dom.find('.eh_select_cbd_tab a:first').attr('data-type');
            // }
            // t.type = ~~ type;
            // t.initByType(t.type);
            if(t.$dom.find('.eh_select_cbd_tab li.active a').length > 0){
                t.$dom.find('.eh_select_cbd_tab li.active a').click();
            }else{
                t.$dom.find('.eh_select_cbd_tab a:first').click();
            }
        },
        render: function(){
            var t = this;
            t.$dom = $(T_cbd({
                tpl: 'main',
                options: t.options
            }));
            t.$container.html(t.$dom);
        },
        initByType: function(type){
            var t = this;

            t.type = type;

            var $c = t.$dom.find('.eh_select_cbd_choice');
            var $f = t.$dom.find('.eh_select_cbd_filter');

            $c.html('');
            $f.html('');

            t.listChoice = new ListChoice($c[0]);
            t.listChoice.init();

            t.addressFilter = new AddressFilter($f[0], type, function(data){
                t.listChoice.setList(data);

                // 是全国就默认选中全部
                if(type === 0){
                    t.listChoice.choiceAll();
                }

                // 是小区且已指定小区则选
                if(type === 2 && t.options.community){
                    t.listChoice.choiceAll();
                }
            }, {
                community: t.options.community
            });
            t.addressFilter.init();
        },
        bindEvent: function(){
            var t = this;

            t.$dom.on('click', '.eh_select_cbd_tab li', function(){
                $(this).addClass('active').siblings().removeClass('active');
                t.initByType(~~$(this).find('a').attr('data-type'));
            });

            t.$dom.on('click', '.eh_select_cbd_ok', function(){
                t.onOK();
            });
        },
        onOK: function(){
            var t = this;
            t.callback(t.type, t.listChoice.getList());
        }
    };


    return CBD;
});