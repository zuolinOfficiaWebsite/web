define(function(require, exports, module){

    'use strict';

    var T_face = require('lib/tpl/build/eh_face');
    var EH = require('lib/js/everhome');
    var Emoji = require('lib/js/eh_emoji');

    var Face = function(container){
        this.$container = $(container);
        this.$dom = null;

        this.init();
    };

    Face.prototype = {
        init: function(){
            var t = this;
            t.render();
            t.$dom.find('span').emoji();
        },
        render: function(){
            var t = this;
            var arr = Emoji.getDefault();
            var data = [];
            $.each(arr, function (index, ele) {
                data.push(ele);
            });
            t.$dom = $(T_face({
                tpl: 'face',
                data: data
            }));
            t.$container.html(t.$dom);
        }
    };

    var FaceLayer = function(target, options, callback){
        this.$target = $(target);

        this.$dom = null;
        this.layer = null;
        this.face = null;

        this.options = $.extend({
            close: true,
            behavior: null // click, hover
        }, options);

        this.callback = callback || function(){};

        this.init();
    };
    FaceLayer.prototype = {
        init: function(){
            var t = this;
            t.render();
            t.bindEvent();
        },
        render: function(){
            var t = this;
            t.$dom = $(T_face({
                tpl: 'face_layer',
                options: t.options
            }));

            t.face = new Face(t.$dom.find('.eh_face_layer_inner')[0]);

            if(!t.options.behavior){
                // 暂时没用
                t.layer = new EH.LayerPop(t.$target[0], t.$dom, {});
                t.onSelect();
            }else if(t.options.behavior === 'click'){
                t.layer = new EH.ClickLayerPop(t.$target[0], t.$dom, {
                    onReady: function(){
                        t.onSelect();
                    }
                });
            }else if(t.options.behavior === 'hover'){
                t.layer = new EH.HoverLayerPop(t.$target[0], t.$dom, {
                    onReady: function(){
                        t.onSelect();
                    }
                });
            }
        },
        onSelect: function(){
            // 这里会有坑，不能用t.$dom 来进行绑定时间。 因为layerPop 的dom会小时，从而座位layerPop儿子的t.$dom 也会消失。
            // 估 使用layer.layerPop 来做绑定
            var t = this;
            t.layer.getDom().on('click', '.eh_face_layer_inner span', function(){
                var code = $(this).attr('data-code');
                t.callback(code, this.innerHTML);
            });
        },
        bindEvent: function(){
            var t = this;
            t.$dom.on('click', '.eh_face_layer_close button', function(){
                t.close();
            });
        },
        close: function(){
            var t = this;
            t.layer.close();
            t.$dom = null;
        }
    };

    return {
        Face: Face,
        FaceLayer: FaceLayer
    };
});