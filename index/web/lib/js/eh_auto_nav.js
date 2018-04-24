/**
 * Created by liyatang on 2015/3/25.
 */

define(function (require, exports, module) {
    'use strict';

    var $ = window.$;

    var EHAutoNav = function (target, to) {
        this.$target = $(target);
        this.$to = $(to);
        this.$dom = null;

        this.data = [];
        this.dom = [];
    };
    EHAutoNav.prototype = {
        init: function () {
            var t = this;
            t.analysisDom();
            t.toData();
            t.render();
            t.$dom.find('nav').scrollspynav();
        },
        analysisDom: function () {
            var t = this;
            t.$target.find('h1,h2,h3,h4,h5,h6').each(function (index, ele) {
                var $d = $(ele);
                // 设置id
                var id = ele.id;
                var name = $d.html();
                if (id === '') {
                    id = '_eh_auto_nav_id_' + index;
                    ele.id = id;
                }

                t.dom.push({
                    id: id,
                    name: name,
                    tag: ele.tagName.toLowerCase(),
                    sub: []
                });
            });
        },
        toData: function () {
            var t = this;
            $.each(t.dom, function (index, ele) {
                var to = t.getInsertTo(t.dom, index);

                if (to.id) {
                    to.sub.push(ele);
                } else {
                    t.data.push(ele);
                }
            });
        },
        getInsertTo: function (arr, index) {
            var tag = arr[index].tag;
            for (var i = index - 1; i >= 0; i--) {
                if (arr[i].tag < tag) {
                    return arr[i];
                }
            }
            return arr;
        },
        render: function () {
            var t = this;
            var html = '<div class="eh_auto_nav" data-am-sticky><nav class="scrollspy-nav" data-am-scrollspy-nav="{offsetTop: 45}" style="margin: 0px;">';
            html +=t.getHtml(t.data);
            html += '</nav></div>';
            t.$dom = $(html);

            if(t.$to.length > 0){
                t.$to.html(t.$dom);
            }else{
                $(document.body).append(t.$dom);
            }
        },
        getHtml: function (arr) {
            var t = this;
            if (arr.length === 0) {
                return '';
            }
            var str = '<ol class="am-nav">';
            $.each(arr, function (index, ele) {
                var substr = t.getHtml(ele.sub);
                str += '<li><a href="#' + ele.id +'">' + ele.name + '</a>' + substr + '</li>';
            });
            str += '</ol>';
            return str;
        }
    };

    return EHAutoNav;
});