define(function (require, exports, module) {

    'use strict';

    var EH = require('lib/js/everhome');
    var Request = require('lib/js/eh_request');
    var Storage = require('lib/js/eh_storage');

    var $ = window.$;
    var EverHomeBussiness = {};
    var EHB = EverHomeBussiness;

    var Util = require('');
    var phone = '';
    /**
     * 获取用户信息
     */
    var getUserInfo = (function () {

        var schedule = null;

        var userInfo = {
            name: '',
            nickName: '',
            userId: '',
            communityId: '',
            communityName: '',
            addressId: ''
        };

        return function (suc, err) {
            suc = suc || function () {
                };
            err = err || function () {
                };

            if (!schedule) {
                schedule = new EH.Schedule.RunOnceAsync(function (next) {

                    Request.getgetUserInfo({}, function (data) {
                        userInfo.name = data.response.accountName;
                        userInfo.nickName = data.response.nickName;
                        userInfo.userId = data.response.id;
                        userInfo.avatar = data.response.avatarUrl || ('../images/defFaceImg.png');
                        userInfo.communityId = data.response.communityId;
                        userInfo.communityName = data.response.communityName;
                        userInfo.addressId = data.response.addressId;
                        if (!data.response.entityList) {
                            data.response.entityList = [];
                            data.response.entityList[0] = {};
                        } else {
                            $(data.response.entityList).each(function (index, ele) {
                                if (ele.entityType === 'enterprise') {
                                    userInfo.entityId = ele.entityId;
                                } else if (ele.entityType === 'community_commercial') {
                                    userInfo.commercialId = ele.entityId;
                                }
                            });
                        }
                        phone = data.response.phones[0];

                        next(userInfo, 0, data);
                    }, {
                        onerror: function (data) {
                            next(null, -1, data);
                            return false;
                        }
                    });
                });
                schedule.init();
            }
            schedule.ready(function (info, c, data) {
                if (c === 0) {
                    suc(info);
                } else {
                    err(null, data);
                }
            });
        };
    })();


    var getOrganizationInfo = (function () {

        var schedule = null;

        var organizationInfo = {
            name: '',
            id: '',
            type: '',
            addressId: ''
        };

        return function (suc, err) {
            suc = suc || function () {
                };
            err = err || function () {
                };

            if (!schedule) {
                schedule = new EH.Schedule.RunOnceAsync(function (next) {

                    Request.postgetCurrentOrganization({}, function (data) {
                        organizationInfo.name = data.response.name;
                        organizationInfo.id = data.response.id;
                        organizationInfo.type = data.response.organizationType;
                        organizationInfo.addressId = data.response.addressId;
                        organizationInfo.communityId = data.response.communityId;
                        organizationInfo.communityName = data.response.communityName;

                        next(organizationInfo, 0, data);
                    }, {
                        onerror: function (data) {
                            next(null, -1, data);
                        }
                    });
                });
                schedule.init();
            }
            schedule.ready(function (info, c, data) {
                if (c === 0) {
                    suc(info);
                } else {
                    err(null, data);
                }
            });
        };
    })();

    var getNEInfo = (function () {
        var schedule = null;

        var neInfo = {
            id: '',
            communityId: ''
        };

        return function (suc, err) {
            suc = suc || function () {
                };
            err = err || function () {
                };

            if (!schedule) {
                schedule = new EH.Schedule.RunOnceAsync(function (next) {
                    Request.getgetneinfo({}, function (data) {
                        neInfo.id = data.neInfo.id;
                        neInfo.communityId = data.neInfo.communityId;

                        next(neInfo, 0);
                    }, {
                        onerror: function (data) {
                            next(null, -1, data);
                        }
                    });
                });
                schedule.init();
            }
            schedule.ready(function (info, c, data) {
                if (c === 0) {
                    suc(info, data);
                } else {
                    err(null, data);
                }
            });
        };
    })();

    var getNCInfo = (function () {
        var schedule = null;
        var ncInfo = {
            id: '',
            communityId: '',
            name: ''
        };

        return function (suc, err) {
            suc = suc || function () {
                };
            err = err || function () {
                };

            if (!schedule) {
                schedule = new EH.Schedule.RunOnceAsync(function (next) {
                    Request.getqueryusercurrnc({}, function (data) {
                        ncInfo.id = data.nc.id;
                        ncInfo.communityId = data.nc.communityId;
                        ncInfo.name = data.nc.name;
                        next(ncInfo, 0);
                    }, {
                        onerror: function (data) {
                            next(null, -1, data);
                        }
                    });
                });
                schedule.init();
            }
            schedule.ready(function (info, c, data) {
                if (c === 0) {
                    suc(info, data);
                } else {
                    err(null, data);
                }
            });
        };
    })();

    /**
     * 获取用户角色信息
     */
    var getUserAccountList = (function () {
        var schedule = null;

        return function (suc, err, type) {
            suc = suc || function () {
                };
            err = err || function () {
                };

            if (!schedule) {
                schedule = new EH.Schedule.RunOnceAsync(function (next) {
                    if (PlateManager.isUserPlate()) {
                        Request.getgetUserOwningFamilies({}, function (data) {
                            next(data, 0);
                        }, {
                            onerror: function (data) {
                                next(null, -1, data);
                            }
                        });
                    }
                    else if (PlateManager.isEnterprisePlate()) {
                        Request.postlistEnterpriseByPhone({
                            phone: phone
                        }, function (data) {
                            next(data, 0);
                        }, {
                            onerror: function (data) {
                                next(null, -1, data);
                            }
                        });
                    }
                    else if (PlateManager.isPMPlate() || PlateManager.isTECHPARKPlate() || PlateManager.isGANCPlate() || PlateManager.isGARCPlate() || PlateManager.isGAPSPlate()) {
                        Request.postlistUserRelatedOrganizations({
                            organiztionType: type
                        }, function (data) {
                            next(data, 0);
                        }, {
                            onerror: function (data) {
                                next(null, -1, data);
                            }
                        });
                    }
                });
                schedule.init();
            }
            schedule.ready(function (info, c, data) {
                if (c === 0) {
                    suc(info, data);
                } else {
                    err(null, data);
                }
            });
        };
    })();

    // 业务原因，登录的时候需要设置ne
    // type 0：普通，1：商家，2：物业，3：服务
    // neid 选填,如果提供则设置 TODO
    var LoginAndSwitchNE = function (suc, type, neid) {
        EHB.Login(function () {
            Request.postswitchne({
                type: type
            }, function (data) {
                suc();
            });
        });
    };

    // 提供排他的弹登录框接口，只能弹一个
    var Login = (function () {
        var l = null;

        return function (suc, config) {
            require.async('lib/js/eh_login', function (L) {
                if (!config) {
                    if (l && l.isValid()) {
                        return;
                    }
                }
                l = new L(config);
                l.login(function () {
                    suc();
                });
                l.init();
            });
        };
    })();

    // 不确保能拿到
    var getSessionId = function () {
        return window.__eh_sessionid__ || '';
    };


    var AddressManager = function () {
        this.cityFilterCache = null;
        this.communityFilterCache = {};
        this.buildingFilterCache = {};
        this.doorFilterCache = {};
    };
    AddressManager.prototype = {
        getCity: function (callback) {
            var t = this;
            if (t.cityFilterCache) {
                callback(t.cityFilterCache);
            } else {
                Request.postactivecitylist({}, function (data) {
                    var result = [];
                    $.each(data.cityList, function (index, ele) {
                        result.push({
                            id: ele.cityId,
                            name: ele.name
                        });
                    });
                    t.cityFilterCache = result;
                    callback(result);
                });
            }
        },
        getCommunity: function () {

        },
        getCommunityFilter: function (cityId, filter, callback) {
            var t = this;
            var key = cityId + '____' + filter;
            callback = callback || function () {
                };
            if (filter === '') {
                callback([]);
                return;
            }

            if (t.communityFilterCache[key]) {
                callback(t.communityFilterCache[key]);
                return;
            }

            Request.getsearchCommunities({
                cityId: cityId,
                keyword: filter
            }, function (data) {
                t.communityFilterCache[key] = data.response;
                callback(data.response);
            });
        },
        getBuildingFilter: function (communityId, filter, callback) {
            var t = this;
            var key = communityId + '____' + filter;
            callback = callback || function () {
                };
            if (filter === '') {
                callback([]);
                return;
            }

            if (t.buildingFilterCache[key]) {
                callback(t.buildingFilterCache[key]);
                return;
            }

            Request.getlistBuildingsByKeyword({
                communityId: communityId,
                keyword: filter
            }, function (data) {
                t.buildingFilterCache[key] = data.response;
                callback(data.response);
            });
        },
        getDoorFilter: function (communityId, buildingName, filter, callback) {
            var t = this;
            var key = communityId + '____' + buildingName + '____' + filter;
            callback = callback || function () {
                };
            if (filter === '') {
                callback([]);
                return;
            }

            if (t.doorFilterCache[key]) {
                callback(t.doorFilterCache[key]);
                return;
            }

            Request.getlistAddressByKeyword({
                communityId: communityId,
                //buildingName: buildingName,
                keyword: filter
                //action: 1 // i do not know
            }, function (data) {
                t.doorFilterCache[key] = data.response;
                callback(data.response);
            });
        }
    };
    var addressManager = null;
    var getAddressManager = function () {
        if (!addressManager) {
            addressManager = new AddressManager();
        }
        return addressManager;
    };

    /**
     * 平台管理
     */
    var PlateManager = {
        TYPE: {
            PLATEPERSONAL: 0,
            PLATEPERSONALNAME: '普通',
            PLATEPERSONALENTRANCE: '/web/user/index.html',

            PLATEBUSINESSES: 1,
            PLATEBUSINESSESNAME: '商家',
            PLATEBUSINESSESENTRANCE: '',

            PLATEPROPERTY: 2,
            PLATEPROPERTYNAME: '物业',
            PLATEPROPERTYENTRANCE: '/web/pm/index.html',

            PLATENEIGHBORCOMMITTEE: 3,
            PLATENEIGHBORCOMMITTEENAME: '居委',
            PLATENEIGHBORCOMMITTEEENTRANCE: '/web/gov/ganc.html',

            PLATERESIDENTCOMMITTEE: 4,
            PLATERESIDENTCOMMITTEENAME: '业委',
            PLATERESIDENTCOMMITTEEENTRANCE: '/web/gov/garc.html',

            PLATEPOLICESTATION: 5,
            PLATEPOLICESTATIONNAME: '公安',
            PLATEPOLICESTATIONENTRANCE: '/web/gov/gaps.html',

            PLATEENTERPRISE: 6,
            PLATENTERPRISENAME: '企业',
            PLATENTERPRISEENTRANCE: '/web/enterprise/index.html',

            PLATETECHPARK: 7,
            PLATETECHPARKNAME: '科技园园区',
            PLATETECHPARKTRANCE: '/web/park/index.html'
        },
        //根据url判断是什么平台
        isParkPlate: function () {
            if (window.location.pathname.indexOf('/w/park') > -1) {
                return true;
            }
            return false;
        },
        isUserPlate: function () {
            if (window.location.pathname.indexOf('/web/user/index.html') > -1) {
                return true;
            }
            return false;
        },
        isPMPlate: function () {
            if (window.location.pathname.indexOf('/web/pm/index.html') > -1) {
                return true;
            }
            return false;
        },
        isTECHPARKPlate: function () {
            if (window.location.pathname.indexOf('/web/park/index.html') > -1) {
                return true;
            } else if (window.location.host.indexOf('park') > -1) {
                return true;
            } else if (window.location.host.indexOf('xunmei') > -1) {
                return true;
            }
            return false;
        },
        isGARCPlate: function () {
            if (window.location.pathname.indexOf('/web/gov/garc.html') > -1) {
                return true;
            }
            return false;
        },
        isGANCPlate: function () {
            if (window.location.pathname.indexOf('/web/gov/ganc.html') > -1) {
                return true;
            }
            return false;
        },
        isGAPSPlate: function () {
            if (window.location.pathname.indexOf('/web/gov/gaps.html') > -1) {
                return true;
            }
            return false;
        },
        isEnterprisePlate: function () {
            if (window.location.pathname.indexOf('/web/enterprise/index.html') > -1) {
                return true;
            } else if (window.location.host.indexOf('corp') > -1) {
                return true;
            } else if (window.location.host.indexOf('xunmei-e') > -1) {
                return true;
            } else if (window.location.host.indexOf('parke') > -1) {
                return true;
            }
            return false;
        },
        getName: function (type) {
            for (var e in PlateManager.TYPE) {
                if (PlateManager.TYPE[e] === type) {
                    return PlateManager.TYPE[e + 'NAME'] + '版';
                }
            }
        },
        getEntrance: function (type) {
            for (var e in PlateManager.TYPE) {
                if (PlateManager.TYPE[e] === type) {
                    return PlateManager.TYPE[e + 'ENTRANCE'];
                }
            }
        },
        switchPlate: function (type, options) {
            options = $.extend({
                enableJump: true,
                onsuccess: function () {
                },
                onerror: function () {
                }
            }, options);
            Request.getgetUserInfo({},
                function (data) {
                    if (data.response) {
                        options.onsuccess();
                        if (options.enableJump) {
                            var url = PlateManager.getEntrance(type);

                            if (url) {
                                window.location.href = url;
                            }
                        }
                    } else {
                        options.onerror();
                    }
                });
        }
    };

    var ChartsManager = {
        show: function (container, table, config) {
            var $container = $(container);
            var $table = $(table);
            config = $.extend({
                blacks: []
            }, config);

            var tableData = [];
            require.async(['js/chart/highcharts'], function () {
                require.async('js/chart/exporting', function () {


                    $table.find('thead th').each(function (index, ele) {
                        if (!ChartsManager.isInBlackList(config.blacks, index)) {
                            var data = [];
                            $table.find('tbody tr').each(function (i, e) {
                                if (index === 0) {
                                    data.push($(e).find('td').eq(index).html());
                                } else {
                                    data.push(parseInt($(e).find('td').eq(index).html()) || 0);
                                }
                            });
                            tableData.push({
                                name: $(ele).html(),
                                data: data
                            });
                        }
                    });

                    $container.highcharts({
                        title: {
                            text: ''
                        },
                        xAxis: {
                            categories: tableData[0].data
                        },
                        legend: {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'middle',
                            borderWidth: 0
                        },
                        series: tableData.slice(1)
                    });
                });
            });
        },
        isInBlackList: function (blacks, i) {
            var flag = false;
            $.each(blacks, function (index, ele) {
                if (ele === i) {
                    flag = true;
                    return false;
                }
            });
            return flag;
        }
    };
    var GlobalConfig = {
        data: {
            contentServer: null
        },

        getContentServer: function () {
            if (GlobalConfig.data.contentServer) {
                return GlobalConfig.data.contentServer;
            } else {
                GlobalConfig.data.contentServer = Storage.get(Storage.KEY.CONTENT_SERVER);
                return GlobalConfig.data.contentServer;
            }
        },

        setContentServer: function (value) {
            if (value !== undefined) {
                Storage.set(Storage.KEY.CONTENT_SERVER, value);
            }
        }
    };

    var PlateConfig = {
        data: {},

        init: function () {
            var host = window.location.host, plate = window.selectPlate && window.selectPlate(host);
            PlateConfig.data = plate || {};
        }
    };

    EverHomeBussiness.getAddressManager = getAddressManager;

    EverHomeBussiness.Login = Login;
    EverHomeBussiness.getUserAccountList = getUserAccountList;
    EverHomeBussiness.getUserInfo = getUserInfo;
    EverHomeBussiness.getOrganizationInfo = getOrganizationInfo;
    EverHomeBussiness.defaultFamilyFace = '/web/lib/images/family_face.png';
    EverHomeBussiness.defaultFace = '/web/lib/images/defFaceImg.png';
    EverHomeBussiness.PlateManager = PlateManager;
    EverHomeBussiness.ChartsManager = ChartsManager;

    EverHomeBussiness.Request = Request;
    EverHomeBussiness.EH = EH;

    // 2.x使用，3.0用不用还未知
    EverHomeBussiness.LoginAndSwitchNE = LoginAndSwitchNE;
    EverHomeBussiness.getNEInfo = getNEInfo;
    EverHomeBussiness.getNCInfo = getNCInfo;
    EverHomeBussiness.getSessionId = getSessionId;

    EverHomeBussiness.GlobalConfig = GlobalConfig;

    window.EverHomeBussiness = EverHomeBussiness;
    window.EHB = EverHomeBussiness;
    PlateConfig.init();
    EverHomeBussiness.PlateConfig = PlateConfig.data;
    EverHomeBussiness.namespaceId = PlateConfig.data.id || 0;
    return EverHomeBussiness;

});
