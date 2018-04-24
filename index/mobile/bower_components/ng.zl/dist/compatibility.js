(function () {
    'use strict';

    var html = '<div class="jumbotron">' +
        '<div class="container">' +
        '<h1>深感抱歉！</h1>' +
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
        '<p>ie系列不支持</p>' +
        '</div>' +
        '</div>';

    var ua = window.navigator.userAgent;

    if(!(ua.indexOf('AppleWebKit') > -1 || ua.indexOf('Gecko') > -1)){
        document.body.innerHTML = html;
    }
})();