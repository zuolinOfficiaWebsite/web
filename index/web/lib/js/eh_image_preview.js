define(function(require, exports, module){

    "use strict";

    var T_image = require('lib/tpl/build/eh_image_preview');
    var EH = require('lib/js/everhome');

    var Preview = function(container, options){
        this.$container = $(container);
        this.$dom = null;
        this.options = $.extend({
            limit: 9
        }, options);
    };
    Preview.prototype = {
        init: function(){
            var t = this;
            t.render();
            t.bindEvent();
        },
        render: function(){
            var t = this;
            t.$dom = $(T_image({
                tpl: 'main'
            }));
            this.$container.html(t.$dom);
        },
        bindEvent: function(){
            var t = this;
            t.$dom.on('click', '.eh_image_preview_cell button', function(){
                $(this).parent().remove();
                if(t.get().length === 0){
                    t.close();
                }
            });
            t.$dom.on('click', '.eh_image_preivew_inner>button', function(){
                t.close();
            });
        },
        close: function(){
            var t = this;
            t.$dom.attr('style', 'display: "";');
            t.clear();
        },
        add: function(uri, url){
            var t = this;
            t.$dom.show();
            t.$dom.find('.eh_image_preview_list').append(T_image({
                tpl: 'cell',
                data: {
                    uri: uri,
                    url: url
                }
            }));
            t.check();
        },
        check: function(){
            var t = this;
            if(t.get().length > t.options.limit){
                EH.Alert('最多' + t.options.limit + '张', 'warning');
                return false;
            }
            return true;
        },
        clear: function(){
            var t = this;
            t.$dom.find('.eh_image_preview_list').empty();
        },
        get: function(){
            var t = this;
            var result = [];
            t.$dom.find('.eh_image_preview_cell').each(function(index, ele){
                result.push({
                    url: $(this).attr('data-url'),
                    uri: $(this).attr('data-uri')
                });
            });
            return result;
        }
    };

    return Preview;
});