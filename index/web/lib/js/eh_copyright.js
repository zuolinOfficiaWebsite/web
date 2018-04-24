define(function(require, exports, module){
    'use strict';
    var $ = window.$;

    var html = '<div class="eh_copyright"><div class="text-center"><p>©2015版权所有：深圳永佳天成科技发展有限公司 粤ICP备13056049 <a href="http://www.cnzz.com/stat/website.php?web_id=1253955449" target="_blank" title="站长统计">站长统计</a></p></div></div>';

    function init(){
        $(document.body).append($(html));
    }

    return {
        init: init
    };
});