define(function (require, exports, module) {
    'use strict';

    var EH = require('lib/js/everhome');

    var num = 0;
    function getCallbackName(){
        return '_eh_lbs_callback_' + (num++);
    }

    var LBS = function (callback) {
        this.callback = callback || function () {};
        this.dialog = null;

        this.callbackname = getCallbackName();
    };
    LBS.prototype = {
        init: function () {
            var t = this;
            t.render();
            t.bindEvent();
        },
        render: function () {
            var t = this;
            t.dialog = new EH.Dialog({
                title: '选择地点',
                content: '<iframe src="' + '/web/lib/html/lbs.html?callback=' + t.callbackname + '" frameborder="0" style="width:100%;height:100%;"></iframe>',
                mask: false,
                close: true,
                css: {
                    width: 800,
                    height: 500
                }
            });
            t.dialog.show();
        },
        bindEvent: function(){
            var t = this;
            window[t.callbackname] = function (poi) {
                t.callback(poi);
                t.dialog.close();
            };
        }
    };


    return LBS;
});