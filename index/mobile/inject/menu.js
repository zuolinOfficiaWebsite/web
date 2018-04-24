$(function () {
    $('.header .header-nav').css({
        display: 'none',
        zIndex: '9999'
    });
    var sliding = false;
    $('.header .am-icon-bars').click(function () {
        if (sliding) return;
        sliding = true;
        $('.header .header-nav').slideToggle(200, function () {
            sliding = false;
        });
    });
    var setSelected = false;
    $('.header .header-nav li a').removeClass('header-nav-selected').each(function () {
        if (this.href === location.href) {
            setSelected = true;
            this.className = 'header-nav-selected';
        }
    });
    if (!setSelected) {
        $('.header .header-nav li a').first().addClass('header-nav-selected');
    }

    $(document).on('click', function(e) {
        if(e.target.className !== "header-nav" && !$(e.target).hasClass('header-nav-btn')) {
            if (sliding) return;
            sliding = true;
            $('.header .header-nav').slideUp(200, function () {
                sliding = false;
            });
        }
    });
});
