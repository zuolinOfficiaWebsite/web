window.myModule.factory('DataCacheService', [function () {
    'use strict';

    var dataCache = {};


    // 只需要注册好即可
    var cache = {
        organizationId: null,
        organizationName: null,
        launchPadItemId: null,
        topicId: null,
        forumId: null,
        groupId: null,
        checkAddress: null,
        appInfo: null,
        newsInfo: null
    };

    _.mapObject(cache, function (value, key) {
        dataCache[key] = {
            get: function () {
                return cache[key] || {};
            },
            set: function (data) {
                cache[key] = angular.copy(data);
            },
            getReset: function () {
                var a = _.extend({}, cache[key]);
                cache[key] = null;
                return a;
            }
        };
    });

    return dataCache;
}]);