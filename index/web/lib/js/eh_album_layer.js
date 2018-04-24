define(function(require, exports, module){

    "use strict";

    var T_layer = require('lib/tpl/build/eh_album_layer');
    var EH = require('lib/js/everhome');

    var $ = window.$;

    var layer = null;

    var AlbumLayer = function(originImgs, thumbImgs){
        this.$dom = null;

        this.mask = null;

        this.originImgs = originImgs;
        this.thumbImgs = thumbImgs;
        this.imgIndex = 0;

        this.event = {};
        this.event.onResize = null;
    };
    AlbumLayer.prototype = {
        init: function(){
            this.render();
            this.bindEvent();
        },
        render: function(){
            this.mask = new EH.Mask(0.8);
            this.$dom = $(T_layer({
                originImgs: this.originImgs,
                thumbImgs: this.thumbImgs,
                imgIndex: this.imgIndex
            }));
            $(document.body).append(this.$dom);
            this.gotoImage(0);
        },
        gotoImage: function(index){
            var t = this;
            this.imgIndex = index;
            t.showErr('');
            var $content = this.$dom.find('.eh_album_layer_content');
            $content.html('');

            var $imgEle = $('<img src=' + this.originImgs[this.imgIndex] + '>');
            $imgEle.css({
                position: 'absolute',
                left: -100000,
                top: -100000
            });
            $imgEle[0].onload = function(){
                $imgEle.attr('data-width', $imgEle.width());
                $imgEle.attr('data-height', $imgEle.height());
                $content.html($imgEle);
                t.doResize();
            };
            $imgEle[0].onerror = function(){
                t.showErr('~~~~加载图片失败~~~~');
                $imgEle.remove();
            };
            $(document.body).append($imgEle);

            var lis = this.$dom.find('.eh_album_layer_list li');
            lis.removeClass('cur');
            lis.eq(this.imgIndex).addClass('cur');
            
        },
        showErr: function(txt){
            this.$dom.find('.eh_album_layer_desc span').html(txt);
        },
        doResize: function(){
            var $content = this.$dom.find('.eh_album_layer_content');
            var $img = $content.find('img');
            
            var cw = $content.width();
            var ch = $content.height();

            $img.css({
                maxWidth: cw,
                maxHeight: ch
            });

            $img.css({
                left: '50%',
                top: '50%',
                marginTop: -$img.height()/2,
                marginLeft: -$img.width()/2
            });
        },
        bindEvent: function(){
            var t = this;
            t.$dom.on('click', '.eh_album_layer_close', function(event){
                t.close();
            }).on('click', '.eh_album_layer_list li a', function(event){
                var n = parseInt($(this).parent().attr('data-index'));
                if(n !== t.imgIndex){
                    t.gotoImage(n);
                }
            }).on('click', '.eh_album_layer_content img', function(event){
                var x = event.clientX;
                var y = event.clientY;

                var $img = $(this);
                var offset = $img.offset();
                var h = $img.height();
                var w = $img.width();

                if(x- offset.left > w/2){
                    if(t.imgIndex < t.originImgs.length - 1){
                        t.gotoImage(t.imgIndex + 1);
                    }
                }else{
                    if(t.imgIndex > 0){
                        t.gotoImage(t.imgIndex - 1);
                    }
                }
            });


            var timer = null;
            this.event.onResize = function() {
                clearTimeout(timer);
                timer = setTimeout(function() {
                    t.doResize();
                }, 500);
            };
            $(window).resize(this.event.onResize);

        },
        close: function(){
            this.$dom.off('click');
            this.$dom.remove();
            this.$dom = null;
            this.mask.close();
            $(window).off('resize', this.event.onReSize);
        }
    };


    var getLayer = function(originImgs, thumbImgs){
        if(layer){
            layer.close();
        }

        layer = new AlbumLayer(originImgs, thumbImgs);
        // 拦截
        var close = layer.close;
        layer.close = function(){
            layer = null;
            close.call(this);
        };

        return layer;
    };

    return {
        getLayer: getLayer
    };

});