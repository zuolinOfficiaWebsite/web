/*TMODJS:{"version":4,"md5":"dab28339934f73757a1536cc2d6b2ed7"}*/
define(function(require){return require("./template")("eh_login",function(a){"use strict";var b=this,c=(b.$helpers,a.tpl),d="";return"dialog"==c?d+=' <div class="eh_login"> <form role="form" class="clearfix"> <div class="form-group"> <label for="id_eh_login_phone">\u7528\u6237\u540d</label> <input type="phone" class="form-control" id="id_eh_login_phone" place="\u7528\u6237\u540d"></input> </div> <div class="form-group"> <label for="id_eh_login_password">\u5bc6\u7801</label> <input type="password" class="form-control" id="id_eh_login_password" place="\u5bc6\u7801"></input> </div> <button type="button" class="btn btn-default pull-right eh_login_submit">\u767b\u5f55</button> </form> </div> ':"index"==c&&(d+=' <div class = "eh_h100"></div> <div class = "eh_login container"> <h3 class = "text-left"><strong>\u8d26\u53f7\u767b\u5f55</strong></h3> <hr/> <form class = "form-horizontal eh_form_valid"> <div class = "form-group"> <label for = "id_eh_login_phone" class = "col-md-3 control-label">\u8d26\u53f7\uff1a</label> <div class = "col-md-9"> <input type = "id_eh_login_phone" class = "form-control" id = "id_eh_login_phone" placeholder = "\u8f93\u5165\u624b\u673a\u53f7/\u7528\u6237\u540d" datatype = "*"> </div> </div> <div class = "form-group"> <label for = "id_eh_login_password" class = "col-md-3 control-label">\u5bc6\u7801\uff1a</label> <div class = "col-md-9"> <input type = "password" class = "form-control" id = "id_eh_login_password" placeholder = "\u8f93\u51656\u523016\u4f4d\u5bc6\u7801" datatype = "*6-16"> </div> </div> <div class = "form-group"> <div class = "col-md-3"></div> <div class = "col-md-9"> <button type = "button" class = "btn btn-success eh_login_submit">\u767b\u5f55</button> &nbsp;&nbsp;&nbsp;<a href = "#a=password_recover"><small>\u5fd8\u8bb0\u5bc6\u7801?</small></a> </div> </div> </form> <hr/> <p class = "text-right"><a href = "#a=sign_up">\u6ca1\u6709\u8d26\u53f7\uff1f\u70b9\u51fb\u7acb\u5373\u6ce8\u518c</a></p> </div> <div class="eh_h100"></div> '),new String(d)})});