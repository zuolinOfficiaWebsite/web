define(function(require, exports, module){
    'use strict';
    require('lib/js/validForm/validForm');

    var $ = window.$;

    function valid(container, opt){
        return $(container).Validform($.extend({
            tiptype: 3
        }, opt));
    }

    return {
        valid: valid
    };

});