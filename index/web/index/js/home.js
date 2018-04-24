$(function(){

   

    $.stellar({horizontalScrolling:false,verticalOffset:40});

    $(document).on('mouseenter', '.download_app_path li', function(){
        $(this).find('.iInspir-cover-user').addClass('col');
        $(this).find('.iInspir-cover-user i').show();
        $(this).find('.iInspir-block')
            .stop()
            .animate({ opacity : '1'}, 300)
            .addClass('op');
    });
    $(document).on('mouseleave', '.download_app_path li', function(){
        $(this).find('.iInspir-block')
            .stop()
            .animate({ opacity : '0'}, 300)
            .removeClass('op')
    });

    var setPictWidth = function(){

        var width = document.body.clientWidth;
        var videoLeft = (width - 418)/2;
        var tempLeft = (width - 321)/2;
        var download = (width - 460)/2;
        var headdownload = (width -484)/2;
        var vedioLeft = (width - 950)/2;
        var startVedio = (width - 44)/2;
        //绝对布局的动态计算距离左边的距离
        //$("#vidio_play").css("left",videoLeft);
        $("#temp_play").css("left",tempLeft);
        $("#downphone").css("left",download);
        $("#head_download").css("left",headdownload);
        $(".page_2").css("left",vedioLeft);
        $("#startVedio").css("left",startVedio);
        var realHeight = 808*width/1631;
        var picTop = 294*realHeight/808;
        //$("#vidio_play").css("top",picTop);
        $("#startVedio").css("top",picTop + 90);

    }

    setPictWidth();

    window.onresize = function() {
        setPictWidth();
    }

    $("#iosClick").click(function(){
       //location.href = 'https://itunes.apple.com/us/app/you-lin/id924870667?mt=8';
    });

    $("#androidClick").click(function(){
        //location.href = 'http://software.youlin.cn/654321/lastest/YL.apk';
    });

    $("#headAndroid").click(function(){
        //location.href = 'http://software.youlin.cn/654321/lastest/YL.apk';
    });

    $("#headIOS").click(function(){
        //location.href = 'https://itunes.apple.com/us/app/you-lin/id924870667?mt=8';
    });

    //二维码淡入淡出

    var timer = null;
    var erweimaLeft = 0;
    //console.log(erweimaLeft)
    function startMove1(){
    
    clearInterval(timer);
    timer = setInterval(function(){
        var erweimaLeft = $(".erweima").offset().left;
        if( erweimaLeft == 0){
            
            clearInterval(timer);
            
            }else{
                
                $(".erweima").offset({left:erweimaLeft+10})
                
                }
        
        },30)
    
    };
    
    function startMove2(){
    
    clearInterval(timer);
    timer = setInterval(function(){
        var erweimaLeft = $(".erweima").offset().left;
        if(erweimaLeft == -110){
            
            clearInterval(timer);
            
            }else{
                
                $(".erweima").offset({left:erweimaLeft-10})
                
                }
        
        },30)
    
    };
    
    $(".erweima").on("mouseenter",function(){
        
        startMove1();
       
    });

    $(".erweima").on("mouseleave",function(){
        startMove2();
    });
        



    document.onkeydown=function(event){
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==27){ // 按 Esc
            YouLInIndex.close()
        }
    }
	
	new WOW().init();
});