define(function (require, modules, exports) {
    'use strict';
    var Upload = require('lib/js/eh_upload');

    var btnName = 'button';

    UE.registerUI(btnName, function (editor, uploadIMG) {
        //注册按钮执行时的command命令，使用命令默认就会带有回退操作
        editor.registerCommand(uploadIMG, {
            execCommand: function () {
                initUpload(function (data) {
                    editor.setContent('<img src="' + data.response.url + '">', true);
                });
            }
        });

        //创建一个button
        var btn = new UE.ui.Button({
            //按钮的名字
            name: uploadIMG,
            //提示
            title: uploadIMG,
            //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
            cssRules: 'background-position: -380px 0;',
            //点击时执行的命令
            onclick: function () {
                //这里可以不用执行命令,做你自己的操作也可
                editor.execCommand(uploadIMG);
            }
        });

        //当点到编辑内容上时，按钮要做的状态反射
        editor.addListener('selectionchange', function () {
            var state = editor.queryCommandState(uploadIMG);
            if (state === -1) {
                btn.setDisabled(true);
                btn.setChecked(false);
            } else {
                btn.setDisabled(false);
                btn.setChecked(state);
            }
        });

        //因为你是添加button,所以需要返回这个button
        return btn;
    }/*index 指定添加到工具栏上的那个位置，默认时追加到最后,editorId 指定这个UI是那个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮*/);

    function initUpload(callback) {
        var upload = null;

        Upload.getImageUploadDelay($('.edui-for-' + btnName)[0], {
            multi: false, // 多选还是有挺多问题需要考虑。 先取消
            width: 30,
            height: 30,
            buttonText: '&nbsp;',
            // queueID: '__id_eh_poster_image_' + t.id + '-queue',
            buttonClass: 'eh_ueditor_upload_button'
        }, {
            onInit: function () {
                $(upload.getQueue()).hide();
            },
            onSuccess: function (file, data, res) {
                //$.each(data.response, function (index, ele) {
                //    t.imagePreview.add(ele.uri, ele.url);
                //});
                // 不知道为什么用数组，暂时干掉
                callback(data);
            }
        }, {
            callback: function (_upload) {
                upload = _upload;
            }
        });
    }
});
