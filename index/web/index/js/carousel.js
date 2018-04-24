/**
 * Created by tingyuan on 15/12/29.
 */
"use strict";

(function ($) {
    if ($ === undefined) {
        return;
    }

    var defaultConfig = {
        num: 3, //代表显示的数量
        maxWidth: 250, //代表中央图片的宽度
        maxHeight: 150, //代表中央图片的高度
        autoPlay: true, //是否自动滚动
        showTime: 2000, //autoPlay为true时这个属性才有用，表示停顿的时间
        animationTime: 300, //滚动一次所用动画时间
        scale: 0.8, //表示缩小的比例
        distance: 'auto', //可以是数值或者'auto'，代表相邻两图的边界距离
        basezIndex: 1 //代表中央图片的z-index值
    };

    function getzIndexValue(num, direction) {
        var zIndexs = [];
        for (var i = 0; i < num; i++) {
            if (i <= (num - 1) / 2) {
                zIndexs.push(i);
            } else {
                zIndexs.push((num - 1) / 2 - i);
            }
        }
        if (direction === 'left') {
            zIndexs.reverse();
            return zIndexs;
        }
        if (direction === 'right') {
            return zIndexs;
        }

    }

    function scroll($container, direction) {
        if ($container.data('isanimating')) {
            return;
        }
        var config = $container.data('config');
        var halfShowNum = (config.num - 1) / 2;
        var scales, i, newIndex;
        var totalNum = $container.data('totalNum');
        var targetCss;
        var firstIndexBeforeScroll, lastIndexBeforeScroll;
        if (direction === 'left') {
            newIndex = ($container.data('index') - 1 + totalNum) % totalNum;
        } else if (direction === 'right') {
            newIndex = ($container.data('index') + 1) % $container.data('totalNum');
        } else {
            return;
        }
        // $container.find('ul li').stop(true, true);
        var tempIndexsInfo = getShowIndexs($container);
        firstIndexBeforeScroll = tempIndexsInfo.indexs[0];
        lastIndexBeforeScroll = tempIndexsInfo.indexs[config.num - 1];
        $container.data('index', newIndex);
        var showIndexsInfo = getShowIndexs($container);
        var zIndexs = getzIndexValue(config.num, direction);
        //if (totalNum === config.num) {
        //    animationTimeForEdge = 0;
        //} else if (totalNum - config.num === 2) {
        //    animationTimeForEdge = config.animationTime / 2;
        //} else {
        //    animationTimeForEdge = config.animationTime;
        //}

        /*
         showIndexsInfo = {
         indexs: [5, 6, 0, 1, 2]
         hashIndexs: {
         '5': 0,
         '6': 1,
         '0': 2,
         '1': 3,
         '2': 4
         }
         }
         */
        $container.find('.slide_list li').each(function (index, element) {

            i = showIndexsInfo.hashIndexs[index];

            if (i !== undefined) {
                scales = Math.pow(config.scale, Math.abs(i - halfShowNum));
                $container.data('isanimating', true);
                $(element).css({
                    display: 'block',
                    'z-index': zIndexs[i] + config.basezIndex
                }).animate({
                    width: scales * config.maxWidth,
                    height: scales * config.maxHeight,
                    left: i * config.distance + (1 - scales) * config.maxWidth * Number(i > halfShowNum),
                    top: (1 - scales) * config.maxHeight / 2
                }, config.animationTime, function () {
                    $container.data('isanimating', false);
                });

            } else {
                scales = Math.pow(config.scale, halfShowNum);
                //if(direction === 'right' && index === firstIndexBeforeScroll){
                //    console.log('right' + index);
                //} else if(direction === 'left' && index === lastIndexBeforeScroll) {
                //    console.log('left' + index);
                //}

                targetCss = {
                    display: 'none',
                    left: halfShowNum * config.distance + (1 - scales) * config.maxWidth / 2,
                    top: 0
                };
                var zIndex = $(element).css('z-index') - 1;
                if (direction === 'left' && index === lastIndexBeforeScroll) {

                    $(element).css('z-index', zIndex).animate({
                        left: "-=" + config.distance + "px"
                    }, config.animationTime, function () {
                        $(element).css(targetCss);
                    });
                } else if (direction === 'right' && index === firstIndexBeforeScroll) {

                    $(element).css('z-index', zIndex).animate({
                        left: "+=" + config.distance + "px"
                    }, config.animationTime, function () {
                        $(element).css(targetCss);
                    });
                } else {
                    $(element).css({
                        display: 'none',
                        width: scales * config.maxWidth,
                        height: scales * config.maxHeight,
                        left: halfShowNum * config.distance + (1 - scales) * config.maxWidth / 2,
                        top: 0
                    });
                }
            }

        });
    }

    function getConfig(newConfig) {
        var config = null;
        if (typeof newConfig === 'object' && newConfig !== null) {
            config = {};
            for (var prop in defaultConfig) {
                if (defaultConfig.hasOwnProperty(prop)) {
                    config[prop] = defaultConfig[prop];
                }
            }
            for (prop in newConfig) {
                if (newConfig.hasOwnProperty(prop) && config.hasOwnProperty(prop)) {
                    config[prop] = newConfig[prop];
                }
            }
        }
        return config;
    }

    function getShowIndexs($container) {
        var showIndexs = [];
        var temp;
        var halfShowNum = ($container.data('config').num - 1) / 2;
        var currentIndex = $container.data('index') || 0;
        var totalNum = $container.data('totalNum') || 0;
        for (var i = -halfShowNum; i <= halfShowNum; i++) {
            temp = currentIndex + i;
            showIndexs.push((temp < 0 ? (temp + totalNum) : temp) % totalNum);
        }
        var hashIndexs = {};
        for (i = 0; i < showIndexs.length; i++) {
            hashIndexs[showIndexs[i]] = i;
        }
        return {
            indexs: showIndexs,
            hashIndexs: hashIndexs
        };
    }

    function initStyle($container) {
        var showIndexsInfo = getShowIndexs($container);
        var config = $container.data('config');
        var zIndex = config.basezIndex;
        var scales;

        var halfShowNum = (config.num - 1) / 2;
        var listWidth = halfShowNum * config.distance * 2 + config.maxWidth;

        var $list, $right, $left;
        $list = $container.find('.slide_list').eq(0);
        $left = $container.find('.slide_left').eq(0);
        $right = $container.find('.slide_right').eq(0);
        var $slideContainer;
        if($container.find('.slide').length === 0) {
            $slideContainer = $('<div class="slide" style="position:relative;"></div>');
            $slideContainer.append([$list, $left, $right]);
            $slideContainer.css('height', config.maxHeight);
            $container.append($slideContainer);
        }

        $list.find('li img').css({
            width: "100%",
            height: "100%"
        });
        $list.css({
            position: 'absolute',
            width: listWidth,
            height: config.maxHeight,
            'list-style': 'none',
            padding: 0,
            margin: 0,
            left: '50%',
            marginLeft: -listWidth / 2,
            top: ($container.height() - config.maxHeight) / 2
        });

        $left.css({
            position: 'absolute',
            left: '50%',
            marginLeft: -config.maxWidth / 2,
            top: $list.position().top + config.maxHeight / 2,
            'z-index': zIndex + $container.data('totalNum') + 1,
            cursor: 'pointer'
        });

        $right.css({
            position: 'absolute',
            right: '50%',
            marginRight: -config.maxWidth / 2,
            top: $list.position().top + config.maxHeight / 2,
            'z-index': zIndex + $container.data('totalNum') + 1,
            cursor: 'pointer'
        });

        $list.find('li').each(function (index, element) {
            var i = showIndexsInfo.hashIndexs[index];
            if (i !== undefined) {
                scales = Math.pow(config.scale, Math.abs(i - halfShowNum));
                $(element).css({
                    display: 'block',
                    position: 'absolute',
                    'z-index': zIndex + (i > halfShowNum ? (config.num - 1 - i) : i),
                    overflow: 'hidden',
                    width: scales * config.maxWidth,
                    height: scales * config.maxHeight,
                    left: i * config.distance + (1 - scales) * config.maxWidth * Number(i > halfShowNum),
                    top: (1 - scales) * config.maxHeight / 2
                });
            } else {
                scales = Math.pow(config.scale, halfShowNum);
                $(element).css({
                    display: 'none',
                    position: 'absolute',
                    overflow: 'hidden',
                    width: scales * config.maxWidth,
                    height: scales * config.maxHeight,
                    left: halfShowNum * config.distance + (1 - scales) * config.maxWidth / 2,
                    top: 0
                });
            }

        });
    }

    $.fn.lunbo = function (param) {
        var config;
        var totalNum;
        var $target;
        $(this).each(function(index, target) {
            $target = $(target);
            if (typeof param === 'object' && param !== null) {
                config = getConfig(param);
                totalNum = $target.find('.slide_list li').length;
                if (totalNum <= 0 || totalNum % 2 === 0) {
                    return;
                }
                if (config.num <= 0 || config.num > totalNum) {
                    config.num = totalNum;
                }
                var calcDistance = ($target.width() - config.maxWidth) / (config.num - 1);
                if(config.distance === 'auto' || config.distance > calcDistance) {
                    config.distance = calcDistance;
                }
                $target.data('config', config);
                $target.data('index', 0);
                $target.data('totalNum', totalNum);
                initStyle($target);

                $target.find('.slide_left').off('click').on('click', (function($target) {
                    return function() {
                        scroll($target, 'left');
                    };
                })($target));
                $target.find('.slide_right').off('click').on('click',(function($target) {
                    return function() {
                        scroll($target, 'right');
                    };
                })($target));

                (function($target) {
                    var autoPlay;
                    clearInterval($target.data('auto'));
                    if($target.data('config').autoPlay) {
                        autoPlay = setInterval(function() {
                            scroll($target, 'right');
                        }, $target.data('config').showTime);
                        $target.data('auto', autoPlay);
                        $target.find('.slide').off('mouseover').on('mouseover', function(event) {
                            if(event.target.className !== 'slide') {
                                clearInterval($target.data('auto'));
                            }

                        }).off('mouseout').on('mouseout', function(event) {
                            if(event.target.className !== 'slide') {
                                autoPlay = setInterval(function() {
                                    scroll($target, 'right');
                                }, $target.data('config').showTime);
                                $target.data('auto', autoPlay);
                            }

                        });

                    } else {
                        $target.find('.slide').off('mouseenter').off('mouseleave');
                    }
                })($target);
            }

        });

    };

})(jQuery);
