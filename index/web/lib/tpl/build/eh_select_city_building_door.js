/*TMODJS:{"version":4,"md5":"e01749839c6da6562ed20a6ae9dc328b"}*/
define(function(require){return require("./template")("eh_select_city_building_door",function(a){"use strict";var b=this,c=(b.$helpers,a.tpl),d=a.options,e=b.$escape,f="";return"main"==c&&(f+=' <div class="eh_select_city_building_door eh_select_cbd"> <ul class="nav nav-tabs eh_select_cbd_tab"> ',d.tab0&&(f+=' <li class="" role="presentation"> <a href="javascript:void(0);" data-type="0">\u5168\u56fd</a> </li> '),f+=" ",d.tab1&&(f+=' <li class="active" role="presentation"> <a href="javascript:void(0);" data-type="1">\u6309\u57ce\u5e02</a> </li> '),f+=" ",d.tab2&&(f+=' <li class="" role="presentation"> <a href="javascript:void(0);" data-type="2">\u6309\u5c0f\u533a</a> </li> '),f+=" ",d.tab3&&(f+=' <li class="" role="presentation"> <a href="javascript:void(0);" data-type="3">\u6309\u697c\u680b</a> </li> '),f+=" ",d.tab4&&(f+=' <li class="" role="presentation"> <a href="javascript:void(0);" data-type="4">\u6309\u95e8\u724c\u53f7</a> </li> '),f+=' </ul> <div class="tab-content eh_select_cbd_content"> <div class="eh_select_cbd_filter"> </div> <div class="eh_select_cbd_choice"> </div> </div> <div class="text-center"> <button class="btn btn-success eh_select_cbd_ok">',f+=e(d.buttonText),f+="</button> </div> </div> "),new String(f)})});