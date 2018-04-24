define(function(require, exports, module){

    'use strict';

    var T_cbd = require('lib/tpl/build/eh_select_company');
    var EH = require('lib/js/everhome');
    var ListChoice = require('lib/js/eh_list_choice');
    var Request = require('lib/js/eh_request');

    var $ = window.$;

    var M = function(container, callback, options){
        this.$container = $(container);
        this.$dom = null;

        this.listChoice = null;

        this.callback = callback || function(){};

        this.options = $.extend({
            communityId: null
        }, options);
    };
    M.prototype = {
        init: function(){
            var t = this;
            t.render();
            t.renderCompany();
            t.bindEvent();
        },
        render: function(){
            var t = this;
            t.$dom = $(T_cbd({
                tpl: 'main'
            }));
            t.$container.html(t.$dom);
        },
        renderCompany: function(){
            var t = this;
            t.listChoice = new ListChoice(t.$dom.find('.eh_select_company_choice'));
            t.listChoice.init();
            Request.getcompanies({
                communityId: t.options.communityId,
                status: '2'
            }, function (data) {
                var arr = [];
                $.each(data.companies || [], function (index, ele) {
                    arr.push({
                        key: ele.id,
                        name: ele.name
                    });
                });
                t.listChoice.setList(arr);
            });
        },
        bindEvent: function(){
            var t = this;
            t.$dom.on('click', '.eh_select_company_ok', function(){
                t.onOK();
            });
        },
        onOK: function(){
            var t = this;
            t.callback(t.listChoice.getList());
        }
    };


    return M;
});