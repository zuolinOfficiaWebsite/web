(function () {
    'use strict';

    var html = '<div class="jumbotron">' +
        '<div class="container">' +
        '<h2>左邻<h2>' +
        '<p>是一款社区交流互助及智慧服务软件。</p>' +
        '<p>用目前已有10000多个小区及园区入驻左邻。左邻致力于通过移动互联网和大数据手段，</p>' +
        '<p>为社区及园区提供智慧解决方案，为其住户、物业提供便捷可信赖的生活交流、分享及服务资源整合平台。</p>' +
        '<h2>深感抱歉！</h2>' +
        '<p>我们暂时支持不了你的浏览器。</p>' +
        '<p>为了更好的体验我们的产品，推荐使用以下浏览器！</p>' +
        '<p>' +
        '<a href="https://www.baidu.com/s?wd=chrome">Chrome <span class="text-success">(推荐)</span></a>' +
        '<br/>' +
        '<a href="https://www.baidu.com/s?wd=firefox">Firefox</a>' +
        '<br/>' +
        '<a href="https://www.baidu.com/s?wd=360">360浏览器（极速模式）</a>' +
        '<a href="https://www.baidu.com/s?wd=360极速浏览器">360极速浏览器 </a>' +
        '<br/>' +
        '</p>' +
        '<p>其他浏览器的极速模式 或 支持H5的浏览器</p>' +
        '<p>ie9+浏览器，其余ie系列不支持</p>' +
        '</div>' +
        '</div>';

    var ua = window.navigator.userAgent;

    if(!(ua.indexOf('AppleWebKit') > -1 || ua.indexOf('Gecko') > -1 || ua.indexOf('MSIE 9.0') > -1 || ua.indexOf('MSIE 10.0') > -1 || ua.indexOf('MSIE 11.0') > -1)){
        document.body.innerHTML = html;
    }
})();