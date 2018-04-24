define(function(require, exports, module) {
    'use strict';
    require('lib/js/ueditor/ueditor.config');
    require('lib/js/ueditor/ueditor.all');
    var EHB = require('lib/js/everhome_bussiness');

    function getConfig(config, opt) {
        var utils = UE.utils;
        var result = utils.extend(utils.clone(window.UEDITOR_CONFIG), config || {});
        opt = opt || {};
        if (opt.toolbar) {
            result.toolbars = result['toolbars_' + opt.toolbar];
        }
        return result;
    }

    // 私有方法 eh_ 前缀
    UE.eh_getEditor = function(id, config, opt) {
        var editor = UE.getEditor(id, getConfig(config, opt));
        editor.ready(function() {
            editor.setContent('<p>左邻，分享一点点<p>');
        });
        return editor;
    };

    // 无论如何都创建一个新的,区别于getEditor（如果已经有则返回）
    UE.eh_createEditor = function(id, config, opt) {
        var editor = new UE.ui.Editor(getConfig(config, opt));
        editor.render(id);
        return editor;
    };

    // 纯文本
    UE.eh_getPlainTxtEditor = function(id, config, opt){
        config = $.extend({
            toolbars: [],
            initialFrameHeight: 80,
            pasteplain: true,
            elementPathEnabled: false,
            enableContextMenu: false
        }, config);
        // 同个id ueditor 会认为统一，会使用之前的东西，故用 eh_createEditor
        var editor = UE.eh_createEditor(id, config, opt);
        editor.addInputRule(function(root){
            // 过滤图片
            $.each(root.getNodesByTagName('img'), function(i, node){
                if(!node.attrs['data-emoji']){
                    node.parentNode.removeChild(node, false);
                }
            });
        });
        return editor;
    };

    UE.Editor.prototype._bk_getActionUrl = UE.Editor.prototype.getActionUrl;
    UE.Editor.prototype.getActionUrl = function(action) {
        if (action == 'uploadimage') {
            return 'http://' + EHB.GlobalConfig.getContentServer() + '/upload/image?token=' + $.cookie('token');
        } else {
            return this._bk_getActionUrl.call(this, action);
        }
    };

    return window.UE;

});
