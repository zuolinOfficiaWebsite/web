/*TMODJS:{"version":4,"md5":"938f18841492b9b6b6c9854121b04dcb"}*/
define(function(require){return require("./template")("eh_face",function(a){"use strict";var b=this,c=(b.$helpers,a.tpl),d=b.$each,e=a.data,f=(a.$value,a.$index,b.$escape),g=a.options,h="";return"face"==c?(h+=' <div class="eh_face clearfix"> ',d(e,function(a){h+=' <span data-code="',h+=f(a),h+='">',h+=f(a),h+="</span> "}),h+=" </div> "):"face_layer"==c&&(h+=' <div class="eh_face_layer"> ',g.close&&(h+=' <div class="eh_face_layer_close"> <button type="button" class="close"><span aria-hidden="true">&times;</span></button> </div> '),h+=' <div class="eh_face_layer_inner"></div> </div> '),new String(h)})});