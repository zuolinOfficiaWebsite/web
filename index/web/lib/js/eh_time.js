define(function (require, exports, modules) {
    'use strict';

    require('bower/moment/moment');

    function now() {
        return moment().format('YYYY-MM-DD HH:mm:ss');
    }

    function nowOnlyToDay() {
        return moment().format('YYYY-MM-DD');
    }

    function nowOnlyToMonth() {
        return moment().format('YYYY-MM');
    }

    function milliseconds2str(milliseconds, type) {
        if (type === 'hour') {
            return moment(milliseconds).format('YYYY-MM-DD HH');
        } else if (type === 'minute') {
            return moment(milliseconds).format('YYYY-MM-DD HH:mm');
        } else if (type === 'second') {
            return moment(milliseconds).format('YYYY-MM-DD HH:mm:ss');
        } else if (type === 'day') {
            return moment(milliseconds).format('YYYY-MM-DD');
        } else if (type === 'Hms') {
            return moment(milliseconds).format('HH:mm:ss');
        } else if (type === 'Hm') {
            return moment(milliseconds).format('HH:mm');
        }

    }

    function str2milliseconds(str) {
        return parseInt(moment(str, 'YYYY-MM-DD HH:mm').format('x'));
    }

    function str2ToMilliseconds(str, type) {
        if (type === 'YMDHm') {
            return parseInt(moment(str, 'YYYY-MM-DD HH:mm').format('x'));
        } else if (type === 'Hms') {
            return parseInt(moment(str, 'HH:mm').format('x'));
        } else if (type === 'YMD') {
            return parseInt(moment(str, 'YYYY-MM-DD').format('x'));
        }
    }

    function milliseconds2strOnlyToDay(milliseconds) {
        return moment(milliseconds).format('YYYY-MM-DD');
    }

    return {
        now: now,
        nowOnlyToDay: nowOnlyToDay,
        nowOnlyToMonth: nowOnlyToMonth,
        milliseconds2str: milliseconds2str,
        str2milliseconds: str2milliseconds,
        milliseconds2strOnlyToDay: milliseconds2strOnlyToDay,
        str2ToMilliseconds: str2ToMilliseconds
    };
})
;