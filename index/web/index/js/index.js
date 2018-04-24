(function() {
    'use strict';

    $(function() {
        function getType(href) {
            if (href.indexOf('/') > 0 && href.indexOf('_') > 0) {
              
                return href.substr(href.lastIndexOf('/') + 1).split('_')[0];
            }
        }
        var type = getType(location.href);
        var subNavs = $('.index_sub_navbar');

        $('#top-nav').find('a').each(function(index) {
            if (getType(this.href) === type) {
                this.parentNode.className = 'active';
                $('.index_' + type + '_navbar').css('display', 'block');
            }
        });

        $('.index_main_navbar li').mouseenter(function(e) {
            var type;
            if (e.target.tagName === 'A') {
                type = getType(e.target.href);
                subNavs.css('display', 'none');
                type && $('.index_' + type + '_navbar').css('display', 'block');
            }
        });

        $('.header-container').mouseleave(function() {
            subNavs.css('display', 'none');
            type && $('.index_' + type + '_navbar').css('display', 'block');
        });
    });

    //seajs.use('lib/js/everhome_bussiness', function (EHB) {
    //    EHB.getUserInfo(function (info) {
    //        var $li = $('.index_navbar').find('.navbar-right li');
    //        $li.last().prev().removeClass('none').find('a').html(info.nickName);
    //        $li.last().removeClass('none').find('a').html('登出');
    //        $li.last().prev().prev().addClass('none');
    //    });
    //});

    $('.index_banner.flexslider').flexslider({
        animation: "slide"
    });


    function autoScroll(obj) {
        var $obj = $(obj);
        $obj.find("li:eq(0)").animate({
            marginTop: "-40px"
        }, 500, function() {
            $(this).css({ marginTop: "0px" });
            $obj.find("li:first").appendTo($obj);
        });
    }

    setInterval(function() {
        autoScroll('.index_actives_ul');
    }, 5000);


    // index co tech
    $('.index_tech_flexslider.flexslider').flexslider({
        animation: "slide",
        itemWidth: 210,
        itemMargin: 5,
        minItems: 2,
        maxItems: 2
    });

    /**底部LOGO轮播 BEGIN*/
    $(function() {
            $('.index_logo.flexslider').flexslider({
                animation: "slide",
                slideshowSpeed: 4500,
                controlNav: false,
                controlsContainer: $(".custom-controls-container"),
                customDirectionNav: $(".custom-navigation a")
            });
            /**此处覆盖轮播默认样式*/
            var logos = $('.index_logo');
            logos.find('.row').css('margin', 0);
        })
    /**底部LOGO轮播 END*/
})();
