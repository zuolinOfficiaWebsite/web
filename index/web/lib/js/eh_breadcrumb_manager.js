define(function(require, exports, module){
    'use strict';
    var BreadCrumb = require('lib/js/eh_breadcrumb');

    // 后续优化
    var cache = {};
    var breadCrumbManager = {
        getBreadCrumb: function(key){
            if(cache[key]){
                return cache[key];
            }
            return null;
        },
        createBreadCrumb: function(key, container, data){
            if(!breadCrumbManager.KEY.hasOwnProperty(key)){
                return;
            }
            var bc = breadCrumbManager.getBreadCrumb(key);
            if(bc){
                return bc;
            }else{
                bc = new BreadCrumb(container, data);
                bc.init();
                cache[key] = bc;
                return bc;
            }
        },
        // key 需要在这里注册,为了方便，key value一致
        KEY: {
            'SERVICE_ACCOUNT': 'SERVICE_ACCOUNT'
        }
    };

    return breadCrumbManager;
});