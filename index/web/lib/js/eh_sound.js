define(function(require, exports, modules) {
    'use strict';

    require('lib/js/jplayer/jquery.jplayer');
    var EH = require('lib/js/everhome');

    var $ = window.$;
    var EhSound = {};

    var ControlSound = function(dom) {
        this.$dom = $(dom);
    };
    ControlSound.prototype = {
        init: function() {
            var t = this;
            t.$dom.addClass('eh_media_sound_play');
            t.bindEvent();
        },
        bindEvent: function() {
            var t = this;
            var sound = null;
            var isready = false;
            t.$dom.click(function () {
                var url = $(this).attr('data-url');
                if (!sound) {
                    sound = new Sound(url,{
                        onready: function () {
                            isready = true;
                            sound.play();
                        },
                        onplay: function() {
                            t.doOnPlay();
                        },
                        onstop: function() {
                            t.doOnStop();
                        },
                        onended: function(){
                            t.doOnStop();
                        },
                        onerror: function(msg){
                            t.doOnStop();
                            EH.Alert(msg, 'warning');
                        }
                    });
                    sound.init();
                }
                if(isready){
                    if (t.$dom.hasClass('eh_media_sound_play')) {
                        sound.play();
                    } else {
                        sound.stop();
                    }
                }
            });
        },
        doOnPlay: function() {
            var t = this;
            t.$dom.removeClass('eh_media_sound_play').addClass('eh_media_sound_stop');
            var $playLogo= t.$dom.find('i');
            $playLogo.removeClass('glyphicon-play glyphicon-stop').addClass('glyphicon-stop');
        },
        doOnStop: function() {
            var t = this;
            t.$dom.addClass('eh_media_sound_play').removeClass('eh_media_sound_stop');
            var $playLogo= t.$dom.find('i');
            $playLogo.removeClass('glyphicon-play glyphicon-stop').addClass('glyphicon-play');
        }
    };

    var Sound = function(url, options) {
        this.url = url;
        this.$dom = null;
        this.options = $.extend({
            onready: function () {},
            onplay: function () {},
            onstop: function () {},
            onended: function () {},
            onerror: function () {}
        }, options);
    };
    Sound.num = 0;
    Sound.prototype = {
        init: function () {
            var t = this;
            t.render();
            t.bindEvent();
        },
        render: function () {
            var t = this;
            var $c = $('#id_jquery_jplayer_container');
            if($c.length === 0){
                $c = $('<div id="id_jquery_jplayer_container" style="width: 0; height: 0;"></div>');
                $(document.body).append($c);
            }
            var id = 'id_jquery_jplayer_' + (Sound.num++);
            t.$dom = $('<div id="' + id + '"></div>');
            $c.append(t.$dom);

            t.$dom.jPlayer({
                ready: function () {
                    t.$dom.jPlayer('setMedia', {
                        mp3: t.url
                    });
                },
                swfPath: '/js/jplayer',
                solution: 'html, flash',
                supplied: 'mp3',
                wmode: 'window'
            });
        },
        bindEvent: function () {
            var t = this;
            t.$dom.bind($.jPlayer.event.ready, function () {
                // test 模拟网络慢，很久才加载完
                // 如果用户在网络慢点很多次
                //setTimeout(function () {
                //    t.options.onready();
                //}, 2000);
                t.options.onready();
            }).bind($.jPlayer.event.play, function () {
                t.options.onplay();
            }).bind($.jPlayer.event.pause, function () {
                t.options.onstop();
            }).bind($.jPlayer.event.ended, function () {
                t.options.onended();
            }).bind($.jPlayer.event.error, function (event) {
                t.options.onerror(event.jPlayer.error.message);
            });
        },
        play: function() {
            var t = this;
            t.$dom.jPlayer('play');

            // 不存在两个音频同时播，需要关闭其他的。
            // 本来想destroy，但没有相关的时间通知。
            // 于是 stop 再 destroy。 但这不会抛stop。
            // 于是 只stop。

            $('#id_jquery_jplayer_container>div').each(function (index, ele) {
                if(ele !== t.$dom[0]){
                    $(ele).jPlayer('stop');
                }
            });
        },
        stop: function() {
            var t = this;
            t.$dom.jPlayer('stop');
        }
    };

    EhSound.ControlSound = ControlSound;
    EhSound.Sound = Sound;

    return EhSound;
});