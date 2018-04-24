define(function(require, exports, module){
    'use strict';
    require('lib/js/cxSelect/js/jquery.cxselect');

    var cxSelect = function(dom, selects, url, options){
        this.$dom = $(dom);
        this.selects = selects;
        this.url = url;
        this.options = $.extend({}, options);

        this._html = this.$dom.html();

        this.init();
    };
    cxSelect.prototype = {
        init: function(){
            var t = this;
            if(t.options.values){
                $.each(t.options.values, function(index, ele){
                    t.$dom.find('.' + t.selects[index]).attr('data-value', ele);
                });
            }
            t.$dom.cxSelect({
                url: t.url,
                selects: t.selects,
            });
        },
        setValues: function(values){
            var t = this;
            t.options.values = values;
            t.$dom.html(t._html);
            t.init();
        },
        getValues: function(){
            var t = this;
            var result = [];
            $.each(t.selects, function(index, ele){
                result.push(t.$dom.find('.' + ele).val());
            });
            return result;
        },
        getData: function(){
            var t = this;
            var result = [];
            $.each(t.selects, function(index, ele){
                var d = t.$dom.find('.' + ele);
                var value = d.val();
                var name = d.find('option[value="' + value + '"]').html();
                result.push({
                    value: value,
                    name: name || null // 保存一致，输出null
                });
            });
            return result;
        }
    };

    var Manager = {
        selectDemo: function(dom, selects, options){
            var url = '/js/cxSelect/js/demo.json';
            var s = new cxSelect(dom, selects, url, options);
            return s;
        },
        selectCityStr: function(dom, selects, options){
            var url = '/js/cxSelect/js/cityData.min.json';
            var s = new cxSelect(dom, selects, url, options);
            return s;
        },
        selectEHCity: function(dom, selects, options){
            var url = '/js/cxSelect/js/ehCityData.json';
            var s = new cxSelect(dom, selects, url, options);
            return s;
        }
    };

    return Manager;
});