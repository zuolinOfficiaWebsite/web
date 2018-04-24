myModule.factory('StorageService', function (storage) {
    'use strict';

    var dataStorage = {};

    //注册
    var storageName = {
        CONTENTSERVER: null,
        USERID: null
    };

    _.mapObject(storageName, function (value, key) {

        dataStorage[key] = {
            get: function () {
                return storage.get(key) || {};
            },
            set: function (data) {
                storage.set(key, data);
            },
            clearAll: function () {
                storage.clearAll();
            },
            getKeys: function () {
                storage.getKeys();
            }
        };
    });

    return dataStorage;
});