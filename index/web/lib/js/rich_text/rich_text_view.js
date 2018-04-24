define(function(require, exports, module){

    require('lib/js/ueditor/ueditor.parse');
    var Request = require('lib/js/eh_request');
    var EH = require('lib/js/everhome');
    var T_view = require('tpl/build/rich_text');
    var $ = window.$;


    var View = function(container){
        this.$container = $(container);
        this.$dom = null;
        this.data = null;
        this.id = EH.string.getParamter('id');
        //this.page= EH.string.getParamter('page');
    };
    View.prototype = {
        init: function(){
            var t = this;
            if(!t.id){
                return;
            }
            Request.postfindLinkById({
                id: t.id
            }, function(data){
                t.data = data.response;
                t.render();
            });
        },
        render: function(){
            var t = this;
            document.title = t.data.title;
            t.$dom = $(T_view({
                data: t.data,
                EH: EH
            }));
            t.$container.html(t.$dom);
            uParse('#' + t.$container[0].id, {
                rootPath: '../'
            });
        }
    };

    function init(container){
        var v = new View(container);
        v.init();

        if(EH.string.getParamter('banner') == 2){
            insertJoinIn(document.body);    
        }
    }

    var insertJoinIn = function(container){
        var $container = $(container);
        var $dom = $('<div class="eh_banner_join_fix"><div class="eh_banner_join"><button id="id_foot_eh_banner_join">报名参加</button></div></div>');
        $container.prepend($dom);
        $dom.on('click', 'button',function(){
            var t = this;
            setTimeout(function(){
                $(t).css({
                    background: '#EE6363'
                });
                if(window.ehibanner && window.ehibanner.jumpCallback){
                    window.ehibanner.jumpCallback();
                }else if(window.ehibanner && window.ehibanner.finishCallback){
                    window.ehibanner.finishCallback();
                }else{
                    
                }
            }, 2000);
            $(t).html('~报名成功啦！~');
        });
    };

    return {
        init: init
    };
});