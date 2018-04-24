define(function (require, exports, module) {
    'use strict';
    require('lib/js/jquery_ui/jquery-ui.css');
    require('lib/js/jquery_ui/jquery-ui');
    require('lib/js/timepicker/jquery.timepicker');
    require('lib/js/datepair/datepair.js');
    require('lib/js/datepair/jquery.datepair.min.js');
    require('lib/js/mobiscroll/css/mobiscroll.custom-2.17.0.min.css');
    require('lib/js/mobiscroll/js/mobiscroll.custom-2.17.0.min.js');
    require('lib/css/jquery.timepicker/jquery.timepicker.css');
    //require('lib/js/timepicker/jquery-ui.multidatespicker.js');

    // require('lib/js/timepicker/jquery-ui-timepicker-addon.css');
    // require('lib/js/timepicker/jquery-ui-timepicker-addon');

    $.datepicker.regional["zh-CN"] = {
        closeText: "关闭",
        prevText: "&#x3c;上月",
        nextText: "下月&#x3e;",
        currentText: "今天",
        monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        monthNamesShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
        weekHeader: "周",
        dateFormat: "yy-mm-dd",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !0,
        yearSuffix: "年"
    };
    $.datepicker.setDefaults($.datepicker.regional["zh-CN"]);


    // 依赖jquery-ui故后续加载
    function loadTimePickerAddon(callback) {
        require.async(['lib/js/timepicker/jquery-ui-timepicker-addon.css', 'lib/js/timepicker/jquery-ui-timepicker-addon'], function () {
            callback();
        });
    }

    // input readonly
    // cursor pointer
    function datepicker(dom, config) {
        var $d = $(dom);
        $d.attr('readonly', 'readonly');
        $d.css({
            'cursor': 'pointer'
        });
        $d.datepicker(config);
        return $d;
    }

    function monthpicker(dom, config) {
        var $m = $(dom);

        $m.attr('readonly', 'readonly');
        $m.css({
            'cursor': 'pointer'
        });

        var _config = $.extend({
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
            dateFormat: 'yy-mm',
            yearRange: '2005:2015',
            beforeShow: function (input, inst) {
                if (inst.input.hasClass('eh_monthpicker')) {
                    inst.dpDiv.addClass('eh_monthpicker');
                }
            }
        }, config);

        $m.datepicker(_config);
        return $m;
    }

    function timepicker(dom, config) {
        var $t = $(dom);
        var _config = $.extend({
            'timeFormat': 'H:i:s',
            'minTime': '06:00',
            'step': 15
        }, config);
        $t.timepicker(_config);
        return $t;
    }

    function datepair(dom, config) {
        var $d = $(dom);
        var _config = $.extend({
            'defaultDateDelta': 0,
            'defaultTimeDelta': 0
        }, config);
        $d.datepair(_config);
        return $d;
    }

    function dateCheck(domStart, domEnd, domStartConfig, domEndConfig) {
        var _domStartConfig = $.extend({
            maxDate: '0d',
            onClose: function (selectedDate) {
                domEnd.datepicker("option", "minDate", selectedDate);
            }

        }, domStartConfig);
        var _domEndConfig = $.extend({
            maxDate: '0d',
            onClose: function (selectedDate) {
                if (selectedDate === "") {
                    selectedDate = "Now";
                }
                domStart.datepicker("option", "maxDate", selectedDate);
            }
        }, domEndConfig);

        domStart.datepicker(_domStartConfig);
        domEnd.datepicker(_domEndConfig);
    }

    function multiDatesPicker(dom, config) {
        var $d = $(dom);
        var _config = $.extend({}, config);
        $d.multiDatesPicker(_config);
    }

    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        return date.getFullYear() + seperator1 + month + seperator1 + strDate;
    }

    function getLastMonthDateOne() {
        var date = new Date();
        var seperator1 = "-";
        var month = date.getMonth();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        } else if (month === 0) {
            month = 12;
        }
        return date.getFullYear() + seperator1 + month + seperator1 + '01';
    }

    function getCurrentMonthDateOne() {
        var date = new Date();
        var seperator1 = "-";
        var month = date.getMonth() + 1;
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        return date.getFullYear() + seperator1 + month + seperator1 + '01';
    }

    function getCurrentYearDateOne() {
        var date = new Date();
        var seperator1 = "-";
        return date.getFullYear() + seperator1 + '01' + seperator1 + '01';
    }

    function getNextYearDateOne() {
        var date = new Date();
        var nextYear = date.getFullYear() + 1;
        var seperator1 = "-";
        return nextYear + seperator1 + '01' + seperator1 + '01';
    }

    function getNextMonthDateOne() {
        var date = new Date();
        var seperator1 = "-";
        var month = date.getMonth() + 2;
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        } else if (month === 13) {
            month = "01";
        }
        return date.getFullYear() + seperator1 + month + seperator1 + '01';
    }

    function calendarMulti(dom, config) {
        var $d = $(dom);
        var _config = $.extend({
            theme: 'material',  // Specify theme like: theme: 'ios' or omit setting to use default
            lang: 'zh',         // Specify language like: lang: 'pl' or omit setting to use default
            display: 'bubble',
            multiSelect: true, // More info about multiSelect: http://docs.mobiscroll.com/2-17-0/calendar#!opt-multiSelect
            dateFormat: 'yy-mm-dd'
        }, config);
        $d.mobiscroll().calendar(_config);
    }

    return {
        loadTimePickerAddon: loadTimePickerAddon,
        datepicker: datepicker,
        monthpicker: monthpicker,
        timepicker: timepicker,
        datepair: datepair,
        datecheck: dateCheck,
        currentDate: getNowFormatDate,
        lastMonthDateOne: getLastMonthDateOne,
        nextMonthDateOne: getNextMonthDateOne,
        currentMonthDateOne: getCurrentMonthDateOne,
        calendarMulti: calendarMulti,
        getCurrentYearDateOne: getCurrentYearDateOne,
        getNextYearDateOne: getNextYearDateOne
    };
});