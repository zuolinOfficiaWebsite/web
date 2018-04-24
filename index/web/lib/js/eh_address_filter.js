define(function(require, exports, module){

    'use strict';

    var T_address = require('lib/tpl/build/eh_address_filter');
    var EH = require('lib/js/everhome');
    var Request = require('lib/js/eh_request');
    var EHB = require('lib/js/everhome_bussiness');

    var $ = window.$;

    var AddressFilter = function(container, type, onFilter, options){
        this.$container = $(container);
        this.$dom = null;

        this.type = type; // 1 城市 2 小区 3 楼栋 4 家庭

        this.onFilter = onFilter || function(){};

        this.addressManager = null;

        this.options = $.extend({
            community: null
        }, options);
    };
    AddressFilter.prototype = {
        init: function(){
            var t = this;
            t.addressManager = EHB.getAddressManager();

            if(t.type === 0 || t.type === 1){
                t.addressManager.getCity(function(cityList){
                    setTimeout(function(){
                        t.onFilter(t.processCity(cityList));
                    }, 0);
                });
                return;
            }

            if(t.type === 2 && t.options.community){
                setTimeout(function(){
                    t.onFilter([t.options.community]);
                });
                return;
            }

            if(t.type === 2 || t.type === 3 || t.type === 4){
                t.render();
                //t.initCity();     //暂时只用在物业，不需要活跃城市接口
                t.bindEvent();
            }
        },
        render: function(){
            var t = this;
            t.$dom = $(T_address({
                tpl: 'main',
                type: t.type,
                options: t.options
            }));
            t.$container.html(t.$dom);
        },
        initCity: function(){
            var t = this;
            t.addressManager.getCity(function(cityList){
                var arr = t.processCity(cityList);
                t.$dom.find('.eh_address_filter_city_list').html(T_address({
                    tpl: 'city_list',
                    data: arr
                }));
                t.setCity(arr[0].key, arr[0].name);
            });
        },
        processCity: function(arr){
            var result = [];
            $.each(arr, function(index, ele){
                result.push({
                    key: ele.id,
                    name: ele.name
                });
            });
            return result;
        },
        setCity: function(key, name){
            var t = this;
            var $d = t.$dom.find('.eh_address_filter_city');
            $d.attr('data-key', key);
            $d.attr('data-name', name);
            $d.html(name);
        },
        getCity: function(){
            var t = this;
            var $d = t.$dom.find('.eh_address_filter_city');
            return {
                key: $d.attr('data-key'),
                name: $d.attr('data-name')
            };
        },
        bindEvent: function(){
            var t = this;
            t.$dom.on('click', '.eh_address_filter_city_list a', function(){
                t.setCity($(this).attr('data-key'), $(this).attr('data-name'));
            });

            var timer = null;
            t.$dom.on('keyup', '.eh_address_filter_community_search', function(){
                var value = $(this).val();
                clearTimeout(timer);
                timer = setTimeout(function(){
                    t.doSearchCommunity(value);
                }, 500);
            });

            t.$dom.on('click', '.eh_address_filter_community_list a', function(){
                t.setCommunity($(this).attr('data-key'), $(this).attr('data-name'));
                $(this).parent().html('');
            });

            var btimer = null;
            t.$dom.on('keyup', '.eh_address_filter_building_search', function(){
                var value = $(this).val();
                clearTimeout(btimer);
                btimer = setTimeout(function(){
                    t.doSearchBuilding(value);
                }, 500);
            });

            t.$dom.on('click', '.eh_address_filter_building_list a', function(){
                t.setBuilding($(this).attr('data-key'), $(this).attr('data-name'));
                $(this).parent().html('');
            });

            var dtimer = null;
            t.$dom.on('keyup', '.eh_address_filter_door_search', function(){
                var value = $(this).val();
                clearTimeout(dtimer);
                dtimer = setTimeout(function(){
                    t.doSearchDoor(value);
                }, 500);
            });

            t.$dom.on('click', '.eh_address_filter_door_list a', function(){
                t.setDoor($(this).attr('data-key'), $(this).attr('data-name'));
                $(this).parent().html('');
            });

        },
        processCommunity: function(arr){
            var result = [];
            $.each(arr, function(index, ele){
                result.push({
                    key: ele.communityId,
                    name: ele.name
                });
            });
            return result;
        },
        doSearchCommunity: function(filter){
            var t = this;
            var cityId = t.getCity().key;
            t.addressManager.getCommunityFilter(cityId, filter, function(data){
                var arr = t.processCommunity(data || []);
                if(t.type === 2){
                    t.onFilter(arr);
                    return;
                }
                if(t.type === 3 || t.type === 4){
                    t.initCommunityList(arr);
                }
            });
        },
        initCommunityList: function(arr){
            var t = this;
            t.$dom.find('.eh_address_filter_community_list').html(T_address({
                tpl: 'list',
                data: arr
            }));
        },
        setCommunity: function(key, name){
            var t = this;
            var $d = t.$dom.find('.eh_address_filter_community_search');
            $d.attr('data-key', key);
            $d.attr('data-name', name);
            $d.val(name);
        },
        getCommunity: function(){
            var t = this;
            var $d = t.$dom.find('.eh_address_filter_community_search');
            return {
                key: $d.attr('data-key'),
                name: $d.attr('data-name')
            };
        },
        processBuilding: function(arr){
            var result = [];
            $.each(arr, function(index, ele){
                result.push({
                    key: ele.buildingName,
                    name: ele.buildingName
                });
            });
            return result;
        },
        doSearchBuilding: function(filter){
            var t = this;
            var communityId = t.getCommunity().key;
            t.addressManager.getBuildingFilter(communityId, filter, function(data){
                var arr = t.processBuilding(data);
                if(t.type === 3){
                    t.onFilter(arr);
                    return;
                }
                if(t.type === 4){
                    t.initBuildingList(arr);
                }
            });
        },
        initBuildingList: function(arr){
            var t = this;
            t.$dom.find('.eh_address_filter_building_list').html(T_address({
                tpl: 'list',
                data: arr
            }));
        },
        getBuilding: function(){
            var t = this;
            var $d = t.$dom.find('.eh_address_filter_building_search');
            return {
                key: $d.attr('data-key'),
                name: $d.attr('data-name')
            };
        },
        setBuilding: function(key, name){
            var t = this;
            var $d = t.$dom.find('.eh_address_filter_building_search');
            $d.attr('data-key', key);
            $d.attr('data-name', name);
            $d.val(name);
        },
        processDoor: function(arr){
            var result = [];
            $.each(arr, function(index, ele){
                result.push({
                    key: ele.id,
                    name: ele.address
                });
            });
            return result;
        },
        doSearchDoor: function(filter){
            var t = this;
            var communityId = t.getCommunity().key;
            var buildingName = t.getBuilding().name;
            t.addressManager.getDoorFilter(communityId, buildingName, filter, function(data){
                var arr = t.processDoor(data.requests);
                t.onFilter(arr);
            });
        }
    };

    return AddressFilter;
});