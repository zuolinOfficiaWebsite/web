/*TMODJS:{"version":4,"md5":"d6f794962a52b2cdfe1fbd42a99e59f9"}*/
define(function(require){return require("./template")("everhome",function(a){"use strict";var b=this,c=(b.$helpers,a.tpl),d=b.$escape,e=a.data,f=a.type,g=a.needClose,h=a.word,i=a.options,j="";return"dialog"==c?(j+=' <div class="eh_dialog panel panel-',j+=d(e.type),j+='"> ',e.title&&(j+=' <div class="eh_dialog_title panel-heading"> <h3 class="panel-title eh_overflow">',j+=d(e.title),j+="</h3> </div> "),j+=' <div class="eh_dialog_content panel-body"> ',e.close&&(j+=' <div class="eh_dialog_close ',null==e.title&&(j+="eh_dialog_close_title_none"),j+=' "> <a href="javascript:void(0);">&times;</a> </div> '),j+=' <div class="eh_dialog_content_inner"></div> </div> </div> '):"alert"==c?(j+=' <div class="eh_alert eh_alert_',j+=d(f),j+=" ",g&&(j+="eh_alert_hasclose"),j+=" panel panel-",j+=d(f),j+='"> <div class="panel-heading"> ',g&&(j+=' <button type="button" class="close eh_alert_close"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span> </button> '),j+=' <h3 class="panel-title">',j+=d(h),j+="</h3> </div> </div> "):"full_screen"==c?j+=' <div class="eh_dialog_full_screen"> <div class="eh_dialog_full_screen_wrap"> <div class="eh_dialog_full_screen_close"><a href="javascript:void(0);">X</a></div> <div class="eh_dialog_full_screen_content"> <div class="eh_dialog_full_screen_content_inner"> </div> </div> </div> </div> ':"layer_pop"==c&&(j+=' <div class="eh_dialog_layer_pop"> <div class="eh_dialog_layer_pop_arrow_line"></div> <div class="eh_dialog_layer_pop_arrow"></div> <div class="eh_dialog_layer_pop_content"> ',i.close&&(j+=' <div class="eh_dialog_layer_pop_content_close clearfix"> <button type="button" class="close"><span aria-hidden="true" colspan="2">&times;</span><span class="sr-only">Close</span></button> </div> '),j+=' <div class="eh_dialog_layer_pop_content_inner"></div> </div> </div> '),new String(j)})});