/*TMODJS:{"version":7,"md5":"11ed70480b36a6f1e82d8ecce91e23fe"}*/
define(function(require){return require("./template")("eh_address",function(a){"use strict";var b=this,c=(b.$helpers,a.tpl),d=a.data,e=b.$escape,f=b.$each,g=(a.$value,a.$index,"");return"main"==c?(g+=' <div> <p class="text-center"> <small>\u8bf7\u8f93\u5165\u5173\u952e\u5b57\u540e\u70b9\u51fb\u51fa\u73b0\u7684\u5019\u9009\u9879\uff0c\u52ff\u76f4\u63a5\u8f93\u5165\u5730\u5740</small> </p> <div class="eh_h5"></div> <div class="input-group"> <span class="input-group-addon"><i class="fa fa-map-marker"></i>&nbsp;&nbsp;\u9009\u57ce\u5e02</span> <div class="input-group-btn eh_address_select_flag"> <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"></button> <ul class="dropdown-menu eh_address_select_city_list" role="menu"> </ul> </div> <input type="text" id="eh_address_select_city" class="form-control" placeholder="\u9009\u62e9\u57ce\u5e02"> </div> <div class="eh_h10"></div> ',d.isShowCommunity&&(g+=' <div class="input-group"> <span class="input-group-addon"><i class="fa fa-home"></i> \u586b\u5c0f\u533a</span> <div class="eh_address_select_flag input-group-btn"> <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"></button> <ul class="dropdown-menu eh_address_select_community_list" role="menu"> </ul> </div> <input type="text" id="eh_address_select_community" class="form-control" placeholder="\u9009\u62e9\u5c0f\u533a"> </div> <div class="eh_h10"></div> '),g+=" ",d.isShowBuilding&&(g+=' <div class="input-group"> <span class="input-group-addon"><i class="fa fa-home"></i> \u697c\u680b\u53f7</span> <div class="input-group-btn eh_address_select_flag"> <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"></button> <ul class="dropdown-menu eh_address_select_building_list" role="menu"> </ul> </div> <input type="text" id="eh_address_select_building" class="form-control" placeholder="\u9009\u697c\u680b\u53f7"> </div> <div class="eh_h10"></div> '),g+=" ",d.isShowApartment&&(g+=' <div class="input-group"> <span class="input-group-addon"><i class="fa fa-home"></i> \u95e8\u724c\u53f7</span> <div class="input-group-btn eh_address_select_flag"> <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"></button> <ul class="dropdown-menu eh_address_select_apartment_list" role="menu"> </ul> </div> <input type="text" id="eh_address_select_apartment" class="form-control" placeholder="\u9009\u95e8\u724c\u53f7"> </div> <div class="eh_h5"></div> '),g+=' <div class="form-group eh_address_submit_btn"> <button type="button" class="btn btn-success">',g+=e(d.btnName),g+="</button> </div> </div> "):"city"==c?(g+=" ",f(d,function(a){g+=' <li data-name="',g+=e(a.name),g+='" data-id="',g+=e(a.id),g+='"><a href="javascript:void(0)">',g+=e(a.name),g+="</a></li> "}),g+=" "):"community"==c?(g+=" ",f(d,function(a){g+=' <li data-name="',g+=e(a.name),g+='" data-id="',g+=e(a.id),g+='"><a href="javascript:void(0)">',g+=e(a.name),g+="</a></li> "}),g+=" "):"building"==c?(g+=" ",f(d,function(a){g+=' <li data-name="',g+=e(a.buildingName),g+='"><a href="javascript:void(0)">',g+=e(a.buildingName),g+="</a></li> "}),g+=" "):"apartment"==c&&(g+=" ",f(d,function(a){g+=' <li data-name="',g+=e(a.apartmentName),g+='" data-id="',g+=e(a.addressId),g+='"><a href="javascript:void(0)">',g+=e(a.apartmentName),g+="</a></li> "}),g+=" "),new String(g)})});