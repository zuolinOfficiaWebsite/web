define(function(require, exports, module) {
    'use strict';
    require('lib/js/hashchange/jquery.ba-hashchange.min.js');
    var EH = require('lib/js/everhome');

    // 建议用这种形式去定义路由级别
    // #a=xx&b=xx&c=xx&d
    var HashChange = function() {
        this.hashChangeEvents = [];
        this.init();
    };
    HashChange.prototype = {
        init: function() {
            var t = this;
            $(window).hashchange(function() {
                var h = t.getHash();
                $.each(t.hashChangeEvents, function(index, ele) {
                    if (ele) {
                        ele(h);
                    }
                });
            });
        },
        onHashChange: function(callback) {
            var t = this;
            t.hashChangeEvents.push(callback);
        },
        trigger: function() {
            $(window).hashchange();
        },
        // 两种传参
        // hash
        // key value
        setHash: function(hash, value) {
            var t = this;
            if (value === undefined) {
                window.location.hash = EH.string.json2hash(hash);
            } else {
                var key = hash;
                var json = t.getHash();
                json[hash] = value;
                window.location.hash = EH.string.json2hash(json);
            }
        },
        // 两种传参
        // hash
        // key value
        goHash: function (hash, value) {
            var t = this;
            var oh = t.getHashString();
            t.setHash(hash, value);
            var nh = t.getHashString();
            if(oh === nh){
                t.trigger();
            }
        },
        getHashString: function() {
            return window.location.hash.replace(/^#/, '');
        },
        getHash: function() {
            return EH.string.hash2json();
        }
    };

    var hc = new HashChange();
    window.hashChange = hc;

    return hc;
});
