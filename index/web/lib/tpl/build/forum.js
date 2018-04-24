/*TMODJS:{"version":23,"md5":"e6bbbe1d41e3e06bdcb1b1e04833b6f0"}*/
define(function(require){return require("./template")("forum",function(a){"use strict";var b=this,c=(b.$helpers,a.tpl),d=b.$escape,e=a.data,f=a.needPhotoSelect,g=a.id_suf,h=a.options,i=b.$each,j=(a.$value,a.$index,"");return"main"==c?j+=' <div class="service_account_forum"> <div class="row service_account_forum_top"> <div class="col-md-3 col-md-offset-7 service_account_forum_search">  </div> <div class="col-md-2 pull-right text-right service_account_forum_create"> <div class="btn-group"> <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">\u53d1\u5e16 <span class="caret"></span></button> <ul class="dropdown-menu dropdown-menu-right" role="menu"> <li data-type="topic"><a href="javascript:void(0);">\u8bdd\u9898\u8d34</a></li> <li data-type="activity"><a href="javascript:void(0);">\u6d3b\u52a8\u8d34</a></li> <li data-type="vote"><a href="javascript:void(0);">\u6295\u7968\u8d34</a></li> </ul> </div> </div> </div> <div class="service_account_forum_tabs"> <ul class="nav nav-tabs" role="tablist"> <li class="active" role="presentation"><a href="javascript:void(0);" data-type="all">\u5168\u90e8</a></li> <li role="presentation"><a href="javascript:void(0);" data-type="my">\u6211\u53d1\u7684\u8d34</a></li> <li role="presentation"><a href="javascript:void(0);" data-type="mydel">\u6211\u5220\u9664\u7684\u8d34</a></li> </ul> </div> <div class="service_account_forum_tab_content"> <div class="row"> <div class="col-md-3"> <select class="form-control service_account_forum_forumlist"> <option value="0">\u6240\u6709\u8bba\u575b</option> </select> </div> </div> <div class="service_account_forum_content"> </div> </div> </div> ':"editor_topic"==c?j+=' <div class="service_account_forum_editor"> <p class="bg-info">\u4e3a\u4fdd\u969c\u7528\u6237\u4f53\u9a8c\uff0c\u4e25\u683c\u6076\u610f\u8425\u9500\uff0c\u4e25\u7981\u53d1\u5e03\u8272\u60c5\u4f4e\u4fd7\u3001\u66b4\u529b\u8840\u8165\u3001\u653f\u6cbb\u8c23\u8a00\u7b49\u5404\u7c7b\u8fdd\u53cd\u6cd5\u5f8b\u6cd5\u89c4\u53ca\u76f8\u5173\u653f\u7b56\u89c4\u5b9a\u7684\u4fe1\u606f\u3002\u4e00\u65e6\u53d1\u73b0\uff0c\u6211\u4eec\u5c06\u4e25\u5389\u6253\u51fb\u548c\u5904\u7406\u3002</p> <form role="form" class="eh_form_valid"> <div class="form-group"> <label for="id_fet_forum">\u9009\u62e9\u8bba\u575b</label> <select class="form-control service_account_forum_forumlist" id="id_fet_forum" datatype="*"> <option value="">\u9009\u62e9\u8bba\u575b</option> </select> </div> <div class="form-group"> <label for="id_fet_title">\u6807\u9898</label> <input type="title" class="form-control" id="id_fet_title" placeholder="\u8f93\u5165\u6807\u9898" datatype="*"></input> </div> <div class="form-group"> <label for="id_fet_content">\u5185\u5bb9\uff08\u9009\u586b\uff09</label> <textarea class="form-control" id="id_fet_content" rows="3" placeholder="\u8f93\u5165\u5185\u5bb9"></textarea> </div> <div class="form-group"> <label>\u6dfb\u52a0\u56fe\u7247\u3001\u56fe\u6587</label> <div> <p class="service_account_photo_text_editor_upload_desc"></p> <button type="button" class="btn btn-default service_account_forum_editor_add_photo">\u6dfb\u52a0\u56fe\u7247</button> <button type="button" class="btn btn-default service_account_forum_editor_add_photo_text">\u6dfb\u52a0\u56fe\u6587</button> <button type="button" class="eh_upload_button" id="service_account_photo_text_editor_upload">\u4e0a\u4f20\u56fe\u7247 </button> </div> </div> <div class="form-group"> <div class="service_account_forum_editor_preivew"> <div class="row service_account_forum_editor_preivew_pt"> </div> <div class="row service_account_forum_editor_preivew_p"> </div> </div> </div> <div class="form-group text-right"> <button type="submit" class="btn btn-primary btn-lg service_account_forum_editor_submit">\u63d0\u4ea4</button> </div> </form> </div> ':"p_pre"==c?(j+=' <div class="col-md-2" data-url="',j+=d(e.url),j+='" data-uri="',j+=d(e.uri),j+='"> <div class="thumbnail text-center"> <img src="',j+=d(e.url),j+='"> <button type="button" class="close service_account_forum_editor_close_p"> <span aria-hidden="true">x</span> </button> </div> </div> '):"pt_pre"==c?(j+=' <div class="col-md-4" data-id="',j+=d(e.mlibNote.id),j+='" data-resid="',j+=d(e.mlibNote.resId),j+='"> <div class="panel panel-default service_account_pt"> <div class="panel-body"> <div class="media"> ',e.mlibNote.coverResPath&&(j+=' <a href="javascript:void(0);" class="media-left"> <img src="',j+=d(e.mlibNote.coverResPath),j+='"> </a> '),j+=' <div class="media-body"> <div> <b>',j+=d(e.mlibNote.title.slice(0,10)),e.mlibNote.title.length>10&&(j+="..."),j+="</b> </div> ",j+=d(e.mlibNote.description.slice(0,30)),e.mlibNote.description.length>30&&(j+="..."),j+=' </div> </div> <button type="button" class="close service_account_forum_editor_close_pt"> <span aria-hidden="true">x</span> </button> </div> </div> </div> '):"editor_vote"==c?j+=' <div class="service_account_forum_editor"> <p class="bg-info">\u4e3a\u4fdd\u969c\u7528\u6237\u4f53\u9a8c\uff0c\u4e25\u683c\u6076\u610f\u8425\u9500\uff0c\u4e25\u7981\u53d1\u5e03\u8272\u60c5\u4f4e\u4fd7\u3001\u66b4\u529b\u8840\u8165\u3001\u653f\u6cbb\u8c23\u8a00\u7b49\u5404\u7c7b\u8fdd\u53cd\u6cd5\u5f8b\u6cd5\u89c4\u53ca\u76f8\u5173\u653f\u7b56\u89c4\u5b9a\u7684\u4fe1\u606f\u3002\u4e00\u65e6\u53d1\u73b0\uff0c\u6211\u4eec\u5c06\u4e25\u5389\u6253\u51fb\u548c\u5904\u7406\u3002</p> <form role="form" class="eh_form_valid"> <div class="row"> <div class="col-md-3"> <div class="form-group"> <label for="id_fev_begin">\u5f00\u59cb\u65f6\u95f4</label> <input type="starttime" class="form-control" id="id_fev_begin" placeholder="\u8f93\u5165\u5f00\u59cb\u65f6\u95f4" datatype="*"/> </div> </div> <div class="col-md-3"> <div class="form-group"> <label for="id_fev_end">\u622a\u6b62\u65f6\u95f4</label> <input type="endtime" class="form-control" id="id_fev_end" placeholder="\u8f93\u5165\u622a\u6b62\u65f6\u95f4" datatype="*"/> </div> </div> <div class="col-md-3"> <div class="form-group"> <label for="id_fev_mul">\u5355\u9009/\u591a\u9009</label> <select class="form-control" id="id_fev_mul" datatype="*"> <option value="0">\u5355\u9009</option> <option value="1">\u591a\u9009</option> </select> </div> </div> <div class="col-md-3"> <div class="form-group"> <label for="id_fev_ano">\u662f\u5426\u91c7\u7528\u533f\u540d\u6295\u7968</label> <select class="form-control" id="id_fev_ano" datatype="*"> <option value="0">\u5426</option> <option value="1">\u662f</option> </select> </div> </div> </div> <div class="form-group"> <label for="id_fev_title">\u6807\u9898</label> <input type="title" class="form-control" id="id_fev_title" placeholder="\u8f93\u5165\u6807\u9898" datatype="*"></input> </div> <div class="form-group"> <label for="id_fev_content">\u5185\u5bb9\uff08\u9009\u586b\uff09</label> <textarea class="form-control" id="id_fev_content" rows="3" placeholder="\u8f93\u5165\u5185\u5bb9"></textarea> </div> <div class="form-group"> <div class="service_account_forum_editor_preivew"> <div class="row service_account_forum_editor_preivew_p"> </div> </div> </div> <div class="form-group"> <label>\u6295\u7968\u9009\u9879</label> <div> <button type="button" class="btn btn-default service_account_forum_editor_add_option"><span class="glyphicon glyphicon-plus"></span> \u6dfb\u52a0\u9009\u9879 </button> <div class="service_account_forum_editor_option_container"> </div> </div> </div> <div class="form-group text-right"> <button type="submit" class="btn btn-primary btn-lg service_account_forum_editor_submit">\u63d0\u4ea4</button> </div> </form> </div> ':"editor_vote_option"==c?(j+=' <div class="row"> <div class="col-md-8"> <input type="text" class="form-control service_account_forum_editor_option_content" placeholder="\u5185\u5bb9" datatype="*"></input> </div> <div class="col-md-2 pull-right text-right"> <button type="button" class="btn btn-default service_account_forum_editor_option_close"><span class="glyphicon glyphicon-remove"></span></button> </div> <div class="col-md-8"> ',f&&(j+=' <button type="button" class="btn btn-default service_account_forum_editor_option_add_photo">\u6dfb\u52a0\u56fe\u7247</button> '),j+=' <button type="button" class="eh_upload_button" id="service_account_photo_text_editor_option_upload_',j+=d(g),j+='"> \u4e0a\u4f20\u56fe\u7247 </button> <div class="row service_account_forum_editor_option_p"> </div> </div> </div> '):"editor_activity"==c?(j+=' <div class="service_account_forum_editor"> <p class="bg-info">\u4e3a\u4fdd\u969c\u7528\u6237\u4f53\u9a8c\uff0c\u4e25\u683c\u6076\u610f\u8425\u9500\uff0c\u4e25\u7981\u53d1\u5e03\u8272\u60c5\u4f4e\u4fd7\u3001\u66b4\u529b\u8840\u8165\u3001\u653f\u6cbb\u8c23\u8a00\u7b49\u5404\u7c7b\u8fdd\u53cd\u6cd5\u5f8b\u6cd5\u89c4\u53ca\u76f8\u5173\u653f\u7b56\u89c4\u5b9a\u7684\u4fe1\u606f\u3002\u4e00\u65e6\u53d1\u73b0\uff0c\u6211\u4eec\u5c06\u4e25\u5389\u6253\u51fb\u548c\u5904\u7406\u3002</p> <form role="form" class="eh_form_valid"> <div class="row"> <div class="col-md-4"> <div class="form-group"> <label for="id_fea_begin">\u5f00\u59cb\u65f6\u95f4</label> <input type="title" class="form-control" id="id_fea_begin" placeholder="\u8f93\u5165\u5f00\u59cb\u65f6\u95f4" datatype="*"/> </div> </div> <div class="col-md-4"> <div class="form-group"> <label for="id_fea_end">\u7ed3\u675f\u65f6\u95f4</label> <input type="title" class="form-control" id="id_fea_end" placeholder="\u8f93\u5165\u7ed3\u675f\u65f6\u95f4" datatype="*"/> </div> </div> </div> <div class="row"> <div class="col-md-6"> <div class="form-group"> <label>\u662f\u5426\u9700\u8981\u6211\u786e\u8ba4</label> <div class="checkbox"> <label> <input type="checkbox" id="id_fea_confirmFlag">\u662f </label> </div> </div> </div> <div class="col-md-6"> <div class="form-group"> <label>\u662f\u5426\u9700\u8981\u7b7e\u5230</label> <div class="checkbox"> <label> <input type="checkbox" id="id_fea_signFlag">\u662f </label> </div> </div> </div> </div> <div class="form-group forum_activity_tag"> </div> <div class="form-group"> <label for="id_fea_title">\u6807\u9898</label> <input type="title" class="form-control" id="id_fea_title" placeholder="\u8f93\u5165\u6807\u9898" datatype="*"></input> </div> <div class="form-group"> <label for="id_fea_addr">\u6d3b\u52a8\u5730\u70b9</label> <div class="input-group"> <span class="input-group-btn"> <button class="btn btn-default" id="id_fea_addr_lbs">\u5730\u56fe\u5b9a\u4f4d</button> </span> <input type="title" class="form-control" id="id_fea_addr" placeholder="\u5730\u56fe\u5b9a\u4f4d" readonly="readonly"></input> </div> </div> <div class="form-group"> <label for="id_fea_content">\u6d3b\u52a8\u8be6\u60c5</label> <textarea class="form-control" id="id_fea_content" rows="3" placeholder="\u8f93\u5165\u6d3b\u52a8\u8be6\u60c5" datatype="*"></textarea> </div> <div class="form-group"> <label>\u6dfb\u52a0\u56fe\u7247</label> <div> <p class="service_account_photo_text_editor_upload_desc"></p> ',f&&(j+=' <button type="button" class="btn btn-default service_account_forum_editor_add_photo">\u6dfb\u52a0\u56fe\u7247</button> '),j+=' <button type="button" class="eh_upload_button" id="service_account_photo_text_editor_upload">\u4e0a\u4f20\u56fe\u7247 </button> </div> </div> <div class="form-group"> <div class="service_account_forum_editor_preivew"> <div class="row service_account_forum_editor_preivew_pt"> </div> <div class="row service_account_forum_editor_preivew_p"> </div> </div> </div> <div class="form-group text-right"> <button type="submit" class="btn btn-primary btn-lg service_account_forum_editor_submit">\u63d0\u4ea4</button> </div> </form> </div> '):"editor_richtext"==c?(j+=' <div class="service_account_forum_editor"> <form class="eh_form_valid"> <div class="form-group"> <label for="id_fer_title">\u6807\u9898</label> <input type="title" class="form-control" id="id_fer_title" placeholder="\u8f93\u5165\u6807\u9898" datatype="*"/> </div> ',h.hasAuthor&&(j+=' <div class="form-group"> <label for="id_fer_author">\u4f5c\u8005\uff08\u9009\u586b\uff09</label> <input type="author" class="form-control" id="id_fer_author" placeholder="\u8f93\u5165\u4f5c\u8005"/> </div> '),j+=' <div class="form-group"> <label for="id_fer_abstract">\u6458\u8981</label> <textarea type="abstract" class="form-control" rows="3" id="id_fer_abstract" placeholder="\u8f93\u5165\u6458\u8981" datatype="*"></textarea> </div> ',h.hasTopicContent&&(j+=' <div class="form-group"> <label for="id_fer_topicContent">\u5185\u5bb9</label> <textarea type="topicContent" class="form-control" rows="3" id="id_fer_topicContent" placeholder="\u8f93\u5165\u5185\u5bb9" datatype="*"></textarea> </div> '),j+=' <div class="form-group"> <label>\u5c01\u9762</label> <div> <p class="service_account_forum_editor_upload_desc"></p> <button type="button" class="eh_upload_button" id="service_account_forum_editor_upload">\u4e0a\u4f20\u56fe\u7247 </button> </div> <div class="thumbnail text-center" id="id_fer_abstract_photo" style="width: 100px;height: auto"> </div> </div> ',h.hasRichEditorBox&&(j+=' <div class="form-group"> <div class="service_account_forum_editor_box" id="service_account_forum_editor"> </div> </div> '),j+=" ",h.hasLink&&(j+=' <div class="form-group"> <label for="id_fer_link">\u8f93\u5165\u94fe\u63a5</label> <input type="link" class="form-control" id="id_fer_link" placeholder="\u8f93\u5165\u94fe\u63a5" datatype="*"/> </div> '),j+=' <div class="form-group text-right"> <button type="submit" class="btn btn-primary btn-lg garden_information_photo_text_submit">\u53d1\u5e03</button> </div> </form> </div> '):"activity_tag"==c&&(j+=' <label for="activityTag">\u6807\u7b7e</label> <select id="activityTag" class="form-control" style="width: 290px;" > ',i(e,function(a){j+=' <option value="',j+=d(a.id),j+='">',j+=d(a.name),j+="</option> "}),j+=" </select> "),new String(j)})});