window.myModule = angular.module('management', ['ngSanitize', 'ui.router', 'ngMaterial', 'ngAnimate', 'zeroclipboard', 'ng.zl', 'ng.zl.grid', 'ng.zl.pick', 'ng.zl.uploader', 'angularLocalStorage', 'ui.bootstrap', 'ui.date', 'ngKeditor']);

window.myModule.config(function (uiZeroclipConfigProvider) {
    'use strict';
    uiZeroclipConfigProvider.setZcConf({
        swfPath: 'bower_components/zeroclipboard/dist/ZeroClipboard.swf'
    });
});
window.myModule.config(function ($stateProvider, $urlRouterProvider) {
    'use strict';

    //$urlRouterProvider.otherwise('main');

    // 登录
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginController'
    });

    // 主页
    $stateProvider.state('main', {
        url: '/main',
        templateUrl: 'views/main.html',
        controller: 'MainController'
    });

    //意见反馈
    $stateProvider.state('feedback_list', {
        url: '/feedback/list',
        templateUrl: 'views/feedback.list.html',
        controller: 'FeedbackListController'
    });

    //app上传管理
    $stateProvider.state('app_list', {
        url: '/app/list',
        templateUrl: 'views/app.list.html',
        controller: 'AppListController'
    }).state('app_upload', {
        url: '/app/upload',
        templateUrl: 'views/app.upload.html',
        controller: 'AppUploadController'
    });

    //商家入驻
    $stateProvider.state('business_list', {
        url: '/business/list',
        templateUrl: 'views/business.list.html',
        controller: 'BusinessListController'
    });

    //政府入驻
    $stateProvider.state('government_list', {
        url: '/government/list',
        templateUrl: 'views/government.list.html',
        controller: 'GovernmentListController'
    });

    //新闻列表
    $stateProvider.state('news_list', {
        url: '/news/list',
        templateUrl: 'views/news.list.html',
        controller: 'NewsListController'
    }).state('news_publish', {
        url: '/news/publish',
        templateUrl: 'views/news.publish.html',
        controller: 'NewsPublishController'
    });

    //视频会议用户列表
    $stateProvider.state('videoconference_list', {
        url: '/videoconference/list',
        templateUrl: 'views/videoconference.list.html',
        controller: 'VideoconferenceListController'
    });

    //联系我们
    $stateProvider.state('contactUs', {
        url: '/contact_us',
        templateUrl: 'views/contact.us.html',
        controller: 'ContactUsController'
    });

});
//<li>PM: 物业</li>
//* <li>GARC: 业委，Government Agency - Resident Committee</li>
//* <li>GANC: 居委，Government Agency - Neighbor Committee</li>
//* <li>GAPS: 公安，Government Agency - Police Station</li>
//* <li>GACW: 社区工作站，Government Agency - Community Workstation</li>
//* <li>BIZS: 商家，business</li>
// GA 政府  BUS 商家  VC 视频会议  AC 门禁  ZLS 左邻小站 PARK 园区 VIL 小区

window.myModule.constant('CooperationTypeList', [
//    {
//    value: 'GA',
//    name: '政府'
//}, {
//    value: 'BUS',
//    name: '商家'
//},
    {
    value: 'VC',
    name: '视频会议'
}, {
    value: 'AC',
    name: '门禁'
}, {
    value: 'ZLS',
    name: '左邻小站'
}, {
    value: 'PARK',
    name: '园区'
},{
    value: 'XZL',
    name: '写字楼'
}, {
    value: 'VIL',
    name: '物业'
}]);