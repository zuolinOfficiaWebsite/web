define(function (require, exports, module) {
    'use strict';

    var $ = window.$;
    var EH = require('lib/js/everhome');
    var baseUrl = '/corp';

    /*如果有就启动 为了这效果加了amaze的脚本和css，会有不兼容情况。
     于是用另外线程抛*/
    setTimeout(function () {
        /*样式不在这里加载，否则bootstrap样式会被覆盖*/
        if (!($.browser.msie && $.browser.version < 8)) {
            if ($.browser.msie) {
                EH.Progress.configure({showSpinner: false});
            }
            $(document).ajaxStart(function () {
                EH.Progress.start();
            });
            $(document).ajaxStop(function () {
                EH.Progress.done();
            });
        }
    }, 1000);


    // 提供两种形式。原则上选其一
    // 1 正常的 success onerror
    // 2 promise 的 then方式。
    // 方式2 如果取消默认的错误处理，需要提供opton.isDefaultError = false;
    var Ajax = function (url, data, suc, opt) {

        this.url = baseUrl + url;
        this.data = $.extend({
            nonce: Math.random()
        }, data);
        this.suc = suc || function () {
            };

        this.option = $.extend({
            isDefaultError: true,
            onerror: function () {
            }
        }, opt);
    };
    Ajax.prototype = {
        post: function () {
            var t = this;
            var def = $.Deferred();
            return $.ajax({
                url: t.url,
                data: t.toFlattenMap(t.data),
                dataType: 'json',
                global: true,
                type: 'post'
            }).then(function (data, status, jqXHR) {
                t.log(data);
                if (t.isSuc(data)) {
                    data = t.fixBigNum(data, jqXHR);
                    t.suc(data, jqXHR.responseText);

                    def.resolve(data, jqXHR.responseText);
                } else {
                    t.showError(data, jqXHR.responseText);

                    def.reject(data, jqXHR.responseText);
                }
            });
        },
        prepend: function (prefix, name, separator) {
            if (prefix) {
                if (separator) {
                    return prefix + "." + name;
                }
                return prefix + name;
            }
            return name;
        },

        flatten: function (prefix, obj, map) {
            var t = this;

            if (obj) {
                if ($.isArray(obj)) {
                    for (var i = 0; i < obj.length; i++) {
                        var item = obj[i];
                        t.flatten(t.prepend(prefix, "[" + i + "]", false), item, map);
                    }
                } else if ($.isPlainObject(obj)) {
                    if (obj.__type__ === 'map') {
                        $.each(obj, function (propertyName, propertyObject) {
                            if (propertyName !== '__type__') {
                                t.flatten(t.prepend(prefix, "[" + propertyName + "]", false), propertyObject, map);
                            }
                        });
                    } else {
                        $.each(obj, function (propertyName, propertyObject) {
                            t.flatten(t.prepend(prefix, propertyName, true), propertyObject, map);
                        });
                    }
                }
                else {
                    map[prefix] = obj;
                }
            }
        },

        toFlattenMap: function (obj) {
            var t = this;

            var map = {};

            t.flatten(null, obj, map);
            return map;
        },
        log: function (data) {
            // EH.Logger.log('-----> ' + this.url);
            // EH.Logger.log(this.data);
            // EH.Logger.log(data);
        },
        isSuc: function (data) {
            var t = this;

            var codes = CodeMap[t.url.replace('', '')];
            if (!codes) {
                if (data.errorCode === 200 || data.errorCode === 201) {
                    return true;
                }
                return false;
            }
            var has = false;
            for (var i = 0; i < codes.length; i++) {
                if (parseInt(codes[i]) === data.errCode) {
                    has = true;
                    break;
                }
            }
            return has;
        },
        showError: function (data, responseText) {
            var t = this;
            var result = null;
            if (t.option.onerror) {
                result = t.option.onerror(data, responseText);
            }

            if (result !== false && t.option.isDefaultError) {
                if (data.errorCode === 401) {
                    EH.Alert('用户未登录', 'warning');

                    setTimeout(function () {
                        require.async('lib/js/everhome_bussiness', function (EHB) {
                            EHB.Login(function () {
                                window.location.reload();
                            });
                        });
                    }, 1000);
                    return false;
                } else {
                    EH.Alert((data.errorDescription || '未知错误') + '  errorCode:' + data.errorCode, 'warning');
                }
            }
        },
        fixBigNum: function (data, jqXHR) {
            if (EH.string.hasBigNumForJSONStr(jqXHR.responseText)) {
                data = EH.string.fixBigNum2JSON(jqXHR.responseText);
            }
            return data;
        },
        isKeyValue: function (obj) {
            for (var e in obj) {
                if (typeof obj[e] === 'object') {
                    return false;
                }
            }
            return true;
        }
    };

    // 需要在这里注册，如果没有则默认 errCode:0 为成功
    var CodeMap = {
        '/w/createfcaction': [9151],
        '/w/updateservicene': [9551],
        '/w/queryneaction': [9351],
        '/w/newTopicWeb': [8101],
        '/w/newCommentWeb': [8151],
        '/w/likeTopicWeb': [8201, 8351],
        '/w/queryCmntyNotice': [8001],
        '/w/sendNote': [7500],
        '/w/sendPropNote': [7500],
        '/w/queryfixtopicweb': [8001],
        '/w/querynemaction': [9401],

        '/m/delComment': [8301],
        '/w/topicdetail': [8001],
        '/w/queryNoteDetail': [7502]
    };

    // 需要注册才能用
    var UrlKey = {

        // 获取城市 小区 楼栋号 门牌号 地址
        '/m/activecitylist': {type: 'post'},
        '/w/dimcmntylist': {type: 'post'},
        '/w/buildinglist': {type: 'post'},
        '/w/queryneaction': {type: 'get'},

        // 发帖
        '/w/newTopicWeb': {type: 'post'},
        '/w/newCommentWeb': {type: 'post'},

        // 贴详情
        '/w/topicdetail': {type: 'get'},

        // 建圈
        '/w/createfcaction': {type: 'post'},

        // 基本信息
        '/w/userinfo': {type: 'get'},
        '/w/getneinfo': {type: 'get'},
        '/w/getnelist': {type: 'get'},
        '/w/switchne': {type: 'post'},


        // 个人版
        '/w/changePassword': {type: 'post'},
        '/w/communityListQuery': {type: 'get'},
        '/w/queryNoteDetail': {type: 'get'},

        // 服务帐号
        '/w/qryrichtext': {type: 'get'},
        '/w/servicedelfuns': {type: 'post'},

        '/w/servicefuns': {type: 'get'},
        '/w/ncadminlist': {type: 'get'},
        '/w/servicetopics': {type: 'get'},
        '/w/topicsbysender': {type: 'get'},
        '/w/topicsbydeleter': {type: 'get'},
        '/w/createServiceTopic': {type: 'post'},
        '/w/deleteServiceTopic': {type: 'post'},
        '/w/mlibimagelist': {type: 'get'},
        '/w/qrymlibimage': {type: 'get'},
        '/w/addmlibresource': {type: 'post'},
        '/w/delmlibimage': {type: 'post'},
        '/w/editmlibimage': {type: 'post'},
        '/w/mlibnotelist': {type: 'get'},
        '/w/qrymlibnote': {type: 'get'},
        '/w/delmlibnote': {type: 'post'},
        '/w/addmlibnote': {type: 'post'},
        '/w/editmlibnote': {type: 'post'},
        '/w/pollingrslist': {type: 'get'},
        '/w/pollavote': {type: 'post'},
        '/w/actrosterlist': {type: 'get'},
        '/w/regactroster': {type: 'post'},
        '/w/cancelactroster': {type: 'post'},

        '/w/cfmactroster': {type: 'post'},
        '/w/rejectactroster': {type: 'post'},

        '/w/event/createticketgroup': {type: 'post'},
        '/w/event/createticket': {type: 'post'},
        '/w/event/createevent': {type: 'post'},
        '/w/event/updateevent': {type: 'post'},
        '/w/event/eventlist': {type: 'get'},
        '/w/event/eventdetail': {type: 'get'},
        '/w/event/rosterinfo': {type: 'get'},
        '/w/event/eventstatuslist': {type: 'get'},

        '/w/event/applyroster': {type: 'post'},
        '/w/event/cancelroster': {type: 'post'},
        '/w/event/signroster': {type: 'post'},
        '/w/serviceaccountinfo': {type: 'get'},
        '/w/updateserviceinfo': {type: 'post'},
        '/w/serviceaccountne': {type: 'get'},
        '/w/updateservicene': {type: 'post'},

        // 物业
        '/w/propmap': {type: 'get'},
        '/w/propbill': {type: 'get'},
        '/w/propbillpush': {type: 'post'},
        '/w/propbilldate': {type: 'get'},
        '/w/propaddrlist': {type: 'get'},
        '/w/approvepropfamilyjoin': {type: 'post'},
        '/w/rejectpropfamilyjoin': {type: 'post'},
        '/w/propaptuser': {type: 'post'},
        '/w/propkickuser': {type: 'post'},
        '/w/propbuildingmanage': {type: 'get'},
        '/w/propaptmanage': {type: 'get'},
        '/w/updatelivingstatus': {type: 'post'},
        '/w/sendPropNote': {type: 'post'},
        '/w/propnemlist1': {type: 'get'},
        '/w/quitncmngr': {type: 'post'},
        '/w/userproplist': {type: 'get'},
        '/admin/userjoinpropne': {type: 'post'},
        '/w/queryfixtopicweb': {type: 'get'},
        '/w/fixtopicassigntask': {type: 'post'},
        '/w/updatetopicweb': {type: 'post'},

        '/w/queryusercurrnc': {type: 'get'},
        '/w/propinvite1': {type: 'get'},
        '/w/communityinfo': {type: 'get'},
        '/w/querynemaction': {type: 'get'},
        '/w/propcommunity': {type: 'get'},
        '/w/propcontact': {type: 'get'},
        '/w/newlinktopic': {type: 'post'},

        // 贴相关
        '/w/likeTopicWeb': {type: 'post'},
        '/w/queryCmntyNotice': {type: 'get'},
        '/w/sendNote': {type: 'post'},

        // 贴评论
        '/m/delComment': {type: 'post'},

        // 投票详情
        '/w/proppollinguser': {type: 'get'},


        // 后台
        '/admin/finduseraddr': {type: 'post'},
        '/admin/assignusercoupon': {type: 'post'},
        '/admin/addcatgcon': {type: 'get'},
        '/admin/addsuggestItem': {type: 'get'},
        '/admin/addlbmktitemconfig': {type: 'post'},
        '/admin/statistics': {type: 'get'},
        '/admin/pushphoneadmin': {type: 'post'},
        '/admin/mergecmnty': {type: 'post'},
        '/admin/apartmentmanage': {type: 'get'},
        '/admin/qrycoupontopic': {type: 'get'},
        '/admin/deletetopics': {type: 'post'},


        // ****** 3.0 ****** //


        //首页
        '/user/logon': {type: 'post'},
        '/user/signup': {type: 'post'},
        '/user/verifyAndLogonByIdentifier': {type: 'post'},
        '/user/setUserAccountInfo': {type: 'post'},
        '/user/verfiyAndResetPassword': {type: 'post'},
        '/user/resendVerificationCodeByIdentifier': {type: 'post'},
        '/user/getUserInfo': {type: 'get'},
        '/user/logoff': {type: 'post'},
        '/user/feedback': {type: 'post'},
        '/org/newCooperation': {type: 'post'},



        //个人版
        '/user/setUserInfo': {type: 'post'},
        '/user/setPassword': {type: 'post'},

        '/address/searchCommunities': {type: 'get'},
        '/address/listBuildingsByKeyword': {type: 'get'},
        '/address/listApartmentsByKeyword': {type: 'get'},
        '/address/claimAddress': {type: 'post'},
        '/address/listAddressByKeyword': {type: 'get'},

        '/region/listRegionByKeyword': {type: 'get'},


        '/family/getUserOwningFamilies': {type: 'get'},
        '/family/setCurrentFamily': {type: 'post'},
        '/family/findFamilyByAddressId': {type: 'get'},
        '/family/getOwningFamilyById': {type: 'get'},
        '/family/leave': {type: 'post'},
        '/family/updateFamilyInfo': {type: 'post'},
        '/family/listNeighborUsers': {type: 'get'},

        // 物业
        '/pm/listPMGroupMembers': {type: 'get'},
        '/pm/setApartmentStatus': {type: 'post'},
        '/pm/getUserOwningProperties': {type: 'get'},
        '/pm/setPropCurrentCommunity': {type: 'post'},
        '/pm/findUserByIndentifier': {type: 'post'},
        '/pm/addPMGroupMemberByPhone': {type: 'post'},
        '/pm/getApartmentStatistics': {type: 'post'},
        '/pm/listPropBuildingsByKeyword': {type: 'post'},
        '/pm/listPropApartmentsByKeyword': {type: 'post'},
        '/pm/listPMAddressMapping': {type: 'get'},
        '/pm/importPMAddressMapping': {type: 'post'},
        '/pm/approvePropFamilyMember': {type: 'post'},
        '/pm/rejectPropFamilyMember': {type: 'post'},
        '/pm/listInvitedUsers': {type: 'get'},
        '/pm/revokePMGroupMember': {type: 'post'},
        '/pm/listPropFamilyWaitingMember': {type: 'get'},
        '/pm/findFamilyByAddressId': {type: 'get'},
        '/pm/setAddressPMStatus': {type: 'post'},
        '/pm/importPMPropertyOwnerInfo': {type: 'post'},
        '/pm/listPMPropertyOwnerInfo': {type: 'get'},
        '/pm/importPmBills': {type: 'post'},
        '/pm/listPropBillDateStr': {type: 'get'},
        '/pm/sendNoticeToFamily': {type: 'post'},
        '/pm/sendPropertyBillsByMonth': {type: 'post'},
        '/pm/sendPropertyBillById': {type: 'post'},
        '/pm/listFamilyMembersByFamilyId': {type: 'post'},
        '/pm/revokePropFamilyMember': {type: 'post'},
        '/pm/listPmTopics': {type: 'post'},
        '/pm/deletePmComment': {type: 'post'},
        '/pm/getPMTopicStatistics': {type: 'post'},
        '/pm/listPmBillsByConditions': {type: 'post'},
        '/pm/listOrgBillingTransactionsByCondition': {type: 'post'},
        '/pm/findBillByAddressIdAndTime': {type: 'post'},
        '/pm/listBillTxByAddressId': {type: 'post'},
        '/pm/sendPmPayMessageByAddressId': {type: 'post'},
        '/pm/payPmBillByAddressId': {type: 'post'},
        '/pm/listOrgBillingTransactionsByConditions': {type: 'post'},
        '/pm/listOweFamilysByConditions': {type: 'post'},
        '/pm/sendPmPayMessageToAllOweFamilies': {type: 'post'},
        '/pm/getPmPayStatistics': {type: 'post'},
        '/pm/deletePmBills': {type: 'post'},
        '/pm/updatePmBill': {type: 'post'},
        '/pm/insertPmBill': {type: 'post'},
        '/community/listBuildings': {type: 'post'},
        '/admin/community/getCommunityManagers': {type: 'post'},
        '/admin/community/updateBuilding': {type: 'post'},
        '/admin/community/verifyBuildingName': {type: 'post'},
        '/admin/community/deleteBuilding': {type: 'post'},
        '/admin/org/addPmBuilding': {type: 'post'},
        '/admin/org/cancelPmBuilding': {type: 'post'},
        '/admin/org/listUnassignedBuilding': {type: 'post'},
        '/admin/org/listPmBuildings': {type: 'post'},
        '/admin/org/listPmManagements': {type: 'post'},
        '/admin/enterprise/createEnterprise': {type: 'post'},
        '/org/listEnterpriseByCommunityId': {type: 'post'},
        '/address/listApartmentsByBuildingName': {type: 'post'},
        '/enterprise/listEnterpriseByCommunityId': {type: 'post'},
        '/address/listUnassignedApartmentsByBuildingName': {type: 'post'},
        '/admin/enterprise/updateEnterprise': {type: 'post'},
        '/community/listCommunityUsers': {type: 'post'},
        '/admin/enterprise/updateContactor': {type: 'post'},
        '/admin/enterprise/deleteEnterprise': {type: 'post'},
        
        '/activity/listActivityCategories': {type: 'post'},
        
        '/admin/org/listParentOrganizationMembers': {type: 'post'},
        '/admin/org/createOrganizationMember': {type: 'post'},
        '/admin/org/updateOrganizationMemberByIds': {type: 'post'},
        '/admin/org/getUserResourcePrivilege': {type: 'post'},
        '/community/get': {type: 'post'},

        //视频会议申请
        '/apply/sendVerificationCode': {type: 'post'},
        '/apply/addVideoconfApplication': {type: 'post'}
    };

    var alias = {
        '/user/signup': 'userSignup',
        '/pm/findUserByIndentifier': 'pmFindUserByIndentifier'
    };

    var Request = {

        // ### 登录登出
        postlogin: function (data, suc, opt) {
            suc = suc || function () {
                };

            opt = $.extend({
                onerror: function () {
                }
            }, opt);

            $.ajax({
                url: '/w/login',
                type: 'post',
                data: data,
                success: function (text) {
                    if (text.indexOf('errorMessage') === -1) {
                        suc();
                    } else {
                        opt.onerror();
                    }
                }
            });
        },
        postlogout: function (data, suc, opt) {
            suc = suc || function () {
                };

            opt = $.extend({
                onerror: function () {
                }
            }, opt);

            $.ajax({
                url: '/w/logout',
                type: 'post',
                success: function (text) {
                    if (text.indexOf('「左邻」用户登录') > -1) {
                        suc.apply(this, arguments);
                    } else {
                        opt.onerror();
                    }
                }
            });
        },

        postparklogin: function (data, suc, opt) {
            suc = suc || function () {
                };

            opt = $.extend({
                onerror: function () {
                }
            }, opt);

            $.ajax({
                url: '/park/w/login',
                type: 'post',
                data: data,
                success: function (data) {
                    if (data.errCode === 200) {
                        suc();
                    } else {
                        if (opt.onerror() !== false) {
                            EH.Alert((data.errDesc || '未知错误') + '  errCode:' + data.errCode, 'warning');
                        }
                    }
                }
            });
        }
    };

    function generate(key, option) {
        var k = option.type + key.split('/').pop();

        $.each(alias, function (_key, value) {
            if (_key === key) {
                k = option.type + value;
            }
        });

        Request[k] = function (data, suc, opt) {
            var url = key;
            var ajax = new Ajax(url, data, suc, opt);
            //if (option.type === 'get') {
            //    return ajax.get();
            //} else {
            return ajax.post();
            //}
        };
    }

    for (var e in UrlKey) {
        if (UrlKey.hasOwnProperty(e)) {
            generate(e, UrlKey[e]);
        }
    }

    return Request;

});