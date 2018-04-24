define(function (require, exports, module) {

    'use strict';

    var T_bar = require('lib/tpl/build/eh_top_bar');
    var Request = require('lib/js/eh_request');
    var EH = require('lib/js/everhome');
    var EHB = require('lib/js/everhome_bussiness');

    var $ = window.$;

    var familyData = null;
    var familyId = null;

    var communityId = null;
    var organizationId = null;

    var propData = null;

    var govData = null;

    var enterpriseData = null;

    var userInfo = null;

    var $dom = null;


    function render() {
        var logosrc = '../lib/images/logo.png';
        var url = 'https://www.zuolin.com';

        if (EHB.PlateManager.isParkPlate()) {
            logosrc = 'lib/images/park/logo/xunmei_logo.png';
        }else if (window.location.host.indexOf('corp') > -1) {
            logosrc = '../web/lib/images/logo.png';
        }else if(window.location.host.indexOf('park') > -1){
            logosrc = '../web/lib/images/logo.png';
        }else if(window.location.host.indexOf('xunmei-e') > -1){
            logosrc = '../web/lib/images/logo.png';
        }else if(window.location.host.indexOf('xunmei') === 0){
            logosrc = '../web/lib/images/logo.png';
        }

        $dom = $(T_bar({
            tpl: 'main',
            logosrc: logosrc,
            url: url
        }));

        $(document.body).prepend($dom);
    }

    function renderFamily() {

        var findFamily = false;

        $.each(familyData.response, function (index, e) {
            if (e.addressId === userInfo.addressId) {
                findFamily = true;
                return false;
            }
        });
        $dom.find('.eh_top_bar_change_family').html(T_bar({
            tpl: 'family',
            familyData: familyData.response,
            findFamily: findFamily,
            currentFamilyAddressId: userInfo.addressId
        }));

        if (!findFamily) {
            EH.Alert('请点击最上面红色部分切换选项', 'warning', {time: 5000, needClose: true});
        }
    }

    function renderEnterprise() {
        var findEnterprise = false;

        $.each(enterpriseData.response.enterprises, function (index, e) {
            if (e.id !== userInfo.entityId) {
                findEnterprise = true;
                return false;
            }
        });
        $dom.find('.eh_top_bar_change_family').html(T_bar({
            tpl: 'enterprise',
            enterpriseData: enterpriseData.response.enterprises,
            findEnterprise: findEnterprise,
            currentEnterpriseId: userInfo.entityId
        }));

        if (!findEnterprise) {
            EH.Alert('请点击最上面红色部分切换选项', 'warning', {time: 5000, needClose: true});
        }
    }
    function renderGov() {
        var findGov = false;

        Request.postgetCurrentOrganization({}, function (data) {
            if (data.response !== undefined) {
                $.each(govData.response, function (index, e) {
                    if (e.id === data.response.id) {
                        findGov = true;
                        return false;
                    }
                });
            }

            $dom.find('.eh_top_bar_change_family').html(T_bar({
                tpl: 'government',
                govData: govData.response,
                findGov: findGov,
                currentGovOrganizationData: data || []
            }));

            if (!findGov) {
                EH.Alert('请点击最上面红色部分切换选项', 'warning', {time: 5000, needClose: true});
            }
        });
    }



    function renderUserInfo() {
        $dom.find('.eh_top_bar_user_info').html(T_bar({
            tpl: 'user',
            userInfo: userInfo
        }));
    }

    function renderLogin() {
        $dom.find('.eh_top_bar_user_info').html(T_bar({
            tpl: 'login'
        }));
    }

    function login() {
        EHB.Login(function () {
            EH.Alert('登录成功', 'success');

            setTimeout(function () {
                window.location.reload();
            }, 1000);
        }, {});
    }

    function bindEvent() {
        $dom.on('click', '.eh_top_bar_change_family li', function (event) {

            if ($(this).attr('data-familyId')) {
                var familyId = $(this).attr('data-familyId');
                Request.postsetCurrentFamily({
                    id: familyId
                }, function (data) {
                    window.location.reload();
                });
            } else if ($(this).attr('data-organizationId')) {
                var organizationId = $(this).attr('data-organizationId');
                Request.postsetCurrentOrganization({
                    organizationId: organizationId
                }, function (data) {
                    window.location.reload();
                });
            } else if ($(this).attr('data-enterpriseId')) {
                var enterpriseId = $(this).attr('data-enterpriseId');
                Request.postsetCurrentEnterprise({
                    enterpriseId: enterpriseId
                }, function (data) {
                    window.location.reload();
                });
            }
        });

        $dom.on('click', '.eh_top_bar_logo', function () {
            window.location.href = 'http://' + window.location.host + window.location.pathname;
        });

        $dom.on('click', '.eh_top_bar_logout', function () {
            Request.postlogoff({}, function () {
                window.location.reload();
            });
        });

        $dom.on('click', '.eh_top_bar_login', function () {
            login();
        });
    }

    var i = 0;

    function init(callback, type) {
        render();
        bindEvent();

        // 根据token判断是否有登录

        if ($.cookie().token) {

            EHB.getUserInfo(function (_userInfo) {
                userInfo = _userInfo;

                renderUserInfo();

                EHB.getUserAccountList(function (data) {
                    var id = null;
                    if (!data.response) {
                        window.location.href = ('#a=family_information'); // 无地址跳到地址注册界面
                    } else if (data.response.enterprises) {
                        enterpriseData = data;
                        id = !$.isEmptyObject(data.response.enterprises) && data.response.enterprises[0].id;
                        renderEnterprise();
                    } else if (!$.isEmptyObject(data.response) && data.response[0].organizationType) {
                        govData = data;
                        id = data.response[0].id;
                        renderGov();
                    } else {
                        familyData = data;

                        renderFamily();
                    }

                    callback(id);

                }, {}, type);
            });
        } else {
            renderLogin();
            login();
        }
    }

    function setCurrentTopBar(data){
        if (data.type === 'enterprise') {
            Request.postsetCurrentEnterprise({
                enterpriseId: data.id
            }, function (data) {
                window.location.reload();
            });
        } else if (data.type === 'park') {
            Request.postsetCurrentOrganization({
                organizationId: data.id
            }, function (data) {
                window.location.reload();
            });
        }
    }

    return {
        init: init,
        setCurrentTopBar:setCurrentTopBar
    };
});
