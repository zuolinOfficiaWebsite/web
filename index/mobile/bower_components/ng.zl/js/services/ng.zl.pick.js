angular.module('ng.zl.pick').factory('$zlPickService', function ($q, $log, $zl) {
    'use strict';

    var baseUrl = '/admin/';

    function post(url, params) {
        var def = $q.defer();
        $.ajax({
            url: url[0] === '/' ? url : (baseUrl + url),
            type: 'post',
            data: params,
            dataType: 'json',
            success: function (data) {
                def.resolve(data);
            },
            error: function () {
                def.reject('服务器错误');
            }
        });
        return processPromise(def.promise);
    }

    function processPromise(promise) {
        // 处理http
        return promise.then(function (data) {
            if (data.errorCode === 0 || data.errorCode === 200) {
                return data.response || {}; // 兼容
            } else {
                return $q.reject((data.errorDescription || '未知错误') + '  errorCode:' + data.errorCode + '  version:' + data.version);
            }
        }, function (reason) {
            return $q.reject(reason);
        }).then(function (data) {
            return data;
        }, function (reason) {
            // 错误提示
            $zl.tips(reason);
            return $q.reject(reason);
        });
    }

    var dataService = {};

    // region
    dataService.getProvinceByWord = function (params) {
        return post('/region/listRegionByKeyword', _.extend(params, {
            scope: 1
        }));
    };
    dataService.getCityByWord = function (params) {
        return post('/region/listRegionByKeyword', _.extend(params, {
            scope: 2
        }));
    };
    dataService.getAreaByWord = function (params) {
        return post('/region/listRegionByKeyword', _.extend(params, {
            scope: 3
        }));
    };
    // address
    dataService.getCommunityByWord = function (params) {
        return post('/address/searchCommunities', params);
    };
    dataService.getBuildingByWord = function (params) {
        return post('/address/listBuildingsByKeyword', params);
    };
    dataService.getApartmentByWord = function (params) {
        return post('/address/listApartmentsByKeyword', params);
    };

    // 在封装一层，打印交出去的数据
    // 同时把params复制一份，避免干扰之前的数据

    var packDataService = {};
    _.each(dataService, function (value, key) {
        packDataService[key] = function (params) {
            return value.apply(this, [angular.copy(params)]).then(function (data) {
                //$log.info('data.service info: ' + key);
                //$log.info(data);
                return angular.copy(data);
            });
        };
    });

    return packDataService;
});