/**
 * Created by 3fuyu on 2015/5/13.
 */
define(function (require, exports, modules) {

    "use strict";

    var T = require('lib/tpl/build/eh_address');
    var Request = require('lib/js/eh_request');
    var EH = require('lib/js/everhome');

    var M = function (container, callback, config) {
        this.$container = $(container);
        this.$dom = null;

        this.config = $.extend({
            btnName: '确认地址',
            isShowCommunity: true,
            isShowBuilding: true,
            isShowApartment: true
        }, config);

        this.timer = null;

        this.cityId = null;
        this.cityName = null;

        this.communityId = null;
        this.communityName = null;

        this.buildingName = null;

        this.apartmentName = null;
        this.apartmentId = null;

        this.address = null;

        this.callback = callback || function () {
            };

    };
    M.prototype = {
        init: function () {
            var t = this;
            t.render();
            t.bindEvent();
            t.initAddress();
        },
        initAddress: function () {
            var t = this;
            t.address = {
                cityName: null,
                cityId: null
            };

            $.each(t.config, function (index, ele) {
                if (ele) {
                    if (index === 'isShowCommunity') {
                        t.address.communityName = null;
                        t.address.communityId = null;
                    } else if (index === 'isShowBuilding') {
                        t.address.buildingName = null;
                    } else if (index === 'isShowApartment') {
                        t.address.apartmentName = null;
                        t.address.apartmentId = null;
                    }
                }
            });
        },
        render: function () {
            var t = this;
            t.$dom = $(T({
                tpl: 'main',
                data: t.config
            }));
            t.$container.html(t.$dom);
        },
        bindEvent: function () {
            var t = this;

            t.$dom.find('#eh_address_select_city').bind('input propertychange', function () {
                clearTimeout(t.timer);

                t.timer = setTimeout(function () {
                    t.selectCity();
                }, 1000);
            });

            t.$dom.find('#eh_address_select_community').bind('input propertychange', function () {
                clearTimeout(t.timer);

                t.timer = setTimeout(function () {
                    t.selectCommunity();
                }, 500);
            });

            t.$dom.find('#eh_address_select_building').bind('input propertychange', function () {
                clearTimeout(t.timer);

                t.timer = setTimeout(function () {
                    t.selectBuilding();
                }, 500);
            });

            t.$dom.find('#eh_address_select_apartment').bind('input propertychange', function () {
                clearTimeout(t.timer);

                t.timer = setTimeout(function () {
                    t.selectApartment();
                }, 500);
            });

            t.$dom.on('click', '.eh_address_submit_btn button', function () {
                t.beforeSubmit();
            });

        },
        selectCity: function () {
            var t = this;

            var keyword = t.$dom.find('#eh_address_select_city').val();

            if (keyword) {
                Request.getlistRegionByKeyword({
                    scope: 2,
                    keyword: keyword,
                    sortBy: ''   //暂时传空，后续去掉

                }, function (data) {
                    t.$dom.find('.eh_address_select_city_list').html(T({
                        tpl: 'city',
                        data: data.response
                    }));
                    t.$dom.find('.eh_address_select_city_list').closest('div').addClass('open'); // 打开组件

                    t.onSelectCity();
                });
            }
        },
        onSelectCity: function () {
            var t = this;

            t.$dom.on('click', '.eh_address_select_city_list li', function () {
                t.cityName = $(this).attr('data-name');
                t.cityId = $(this).attr('data-id');

                t.$dom.find('#eh_address_select_city').val(t.cityName);

                t.address.cityName = t.cityName;
                t.address.cityId = t.cityId;
            });
        },
        selectCommunity: function () {
            var t = this;

            var keyword = t.$dom.find('#eh_address_select_community').val();

            if (keyword) {
                Request.getsearchCommunities({
                    keyword: keyword,
                    cityId: t.cityId
                }, function (data) {
                    t.$dom.find('.eh_address_select_community_list').html(T({
                        tpl: 'community',
                        data: data.response
                    }));
                    t.$dom.find('.eh_address_select_community_list').closest('div').addClass('open'); // 打开组件

                    t.onSelectCommunity();
                });
            }
        },
        onSelectCommunity: function () {
            var t = this;

            t.$dom.on('click', '.eh_address_select_community_list li', function () {
                t.communityName = $(this).attr('data-name');
                t.communityId = $(this).attr('data-id');

                t.$dom.find('#eh_address_select_community').val(t.communityName);

                t.address.communityName = t.communityName;
                t.address.communityId = t.communityId;
            });
        },
        selectBuilding: function () {
            var t = this;

            var keyword = t.$dom.find('#eh_address_select_building').val();

            if (keyword && t.communityId) {
                Request.getlistBuildingsByKeyword({
                    keyword: keyword,
                    communityId: t.communityId
                }, function (data) {
                    t.$dom.find('.eh_address_select_building_list').html(T({
                        tpl: 'building',
                        data: data.response
                    }));

                    t.$dom.find('#eh_address_select_building').closest('div').find('button').click(); //模拟点击

                    t.onSelectBuilding();
                });
            }
        },
        onSelectBuilding: function () {
            var t = this;

            t.$dom.on('click', '.eh_address_select_building_list li', function () {
                t.buildingName = $(this).attr('data-name');

                t.$dom.find('#eh_address_select_building').val(t.buildingName);

                t.address.buildingName = t.buildingName;
            });
        },
        selectApartment: function () {
            var t = this;

            var keyword = t.$dom.find('#eh_address_select_apartment').val();

            if (keyword && t.communityId && t.buildingName) {
                Request.getlistApartmentsByKeyword({
                    keyword: keyword,
                    communityId: t.communityId,
                    buildingName: t.buildingName
                }, function (data) {
                    t.$dom.find('.eh_address_select_apartment_list').html(T({
                        tpl: 'apartment',
                        data: data.response
                    }));

                    t.$dom.find('#eh_address_select_apartment').closest('div').find('button').click(); //模拟点击

                    t.onSelectApartment();
                });
            }
        },
        onSelectApartment: function () {
            var t = this;

            t.$dom.on('click', '.eh_address_select_apartment_list li', function () {
                t.apartmentName = $(this).attr('data-name');
                t.apartmentId = $(this).attr('data-id');

                t.$dom.find('#eh_address_select_apartment').val(t.apartmentName);

                t.address.apartmentName = t.apartmentName;
                t.address.apartmentId = t.apartmentId;
            });
        },
        beforeSubmit: function () {
            var t = this;
            var check = 'check';

            $.each(t.address, function (index, ele) {
                check = check && ele;
            });

            if (check === '' || check === null) {
                EH.Alert('请点击候选项进行选择，勿直接输入地址', 'warning');
                return false;
            } else {
                t.onOk();
            }
        },
        onOk: function () {
            var t = this;
            t.callback(t.getData());
        },
        getData: function () {
            var t = this;
            return t.address;
        }
    };

    return M;
});