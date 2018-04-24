define(function(require, exports, module){
    'use strict';
    var T_operation = require('lib/tpl/build/eh_operation');
    var EH = require('lib/js/everhome');

    var $ = window.$;
    var $dom = null;

    var config = {
        hasBottom: false
    };


    function init(_config){

        $.extend(config, _config);

        $dom = $(T_operation({
            data: config
        }));
        $dom.on('click', '.eh_operation_backtop', function(){
            EH.Scroll.setScrollTop();
        }).on('click', '.eh_operation_backbottom', function(){
            EH.Scroll.setScrollBottom();
        });

        $(document.body).append($dom);
    }

    return {
        init: init
    };

});