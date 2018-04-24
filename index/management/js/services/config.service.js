myModule.factory('ConfigService', [function () {
    'use strict';

    var config = {};

    config.eventKey = {
        USER_LOGIN :'user_login',
        USER_LOGOFF :'user_logoff'
    };

    return config;
}]);