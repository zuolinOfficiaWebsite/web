define(function(require, exports, module) {
    'use strict';
    var Storage = require('lib/js/storage/storage');


    // 为避免key混乱，用到的key需要在这里注册,通过去Storage.KEY.xxxx来得到key
    // key 和 value 保持一致
    var keyMap = {
        EH_LOGIN_USER: 'EH_LOGIN_USER',
        CONTENT_SERVER: 'CONTENT_SERVER'
    };

    return {
        KEY: keyMap,
        set: function(key, value) {
            if(keyMap[key]){
                Storage.set('EH_STORAGE_' + key, value);
            }
        },
        get: function(key) {
            if(keyMap[key]){
                return Storage.get('EH_STORAGE_' + key);
            }
        }
    };
});