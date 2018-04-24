define(function (require, exports, module) {

    'use strict';

    var T_everhome = require('lib/tpl/build/everhome');

    var $ = window.$;

    var EverHome = {};

    /**
     * 滑过目标出现浮层
     * @param target 目标dom
     * @param html 显示的内容
     * @param options(选填) {onReady: 处理ready后的function}
     */
    // 因为HoverLayerPop封装了一层，在close的时候dom会干掉，相对应的事件会被释放，之前html的行为也会不见。故加多个onReady通知调用放已经重新ready
    var HoverLayerPop = function (target, html, options) {
        this.$target = $(target);
        this.html = html;
        this.target = target;
        this.options = $.extend({
            onReady: function () {
            }
        }, options);
        this.layerPop = null;
        this.show();
    };
    HoverLayerPop.prototype = {
        show: function () {
            var t = this;
            if (!t.LayerPop) {
                t.render();
            }
        },
        render: function () {
            var t = this;
            t.$target.mouseover(function () {
                if (t.layerPop && t.layerPop.isValid()) {
                    t.layerPop.close();
                }
                t.layerPop = new EverHome.LayerPop(t.target, t.html, t.options);
                t.options.onReady();
            });
        },
        getDom: function () {
            var t = this;
            return t.layerPop.getDom();
        },
        close: function () {
            var t = this;
            t.layerPop.close();
        }
    };

    /**
     * 点击目标出现浮层
     * @param target 目标dom
     * @param html 显示的内容
     * @param options(选填) {onReady: 处理ready后的function}
     */
    // 因为ClickLayerPop封装了一层，在close的时候dom会干掉，相对应的事件会被释放，之前html的行为也会不见。故加多个onReady通知调用方已经重新ready
    var ClickLayerPop = function (target, html, options) {
        this.$target = $(target);
        this.html = html;
        this.target = target;
        this.options = $.extend({
            onReady: function () {
            }
        }, options);
        this.layerPop = null;

        this.show();
    };
    ClickLayerPop.prototype = {
        show: function () {
            var t = this;
            if (!t.layerPop) {
                t.render();
            }
        },
        render: function () {
            var t = this;
            t.$target.click(function () {
                if (t.layerPop && t.layerPop.isValid()) {
                    t.layerPop.close();
                }
                t.layerPop = new EverHome.LayerPop(t.target, t.html, t.options);
                t.options.onReady();
            });
        },
        getDom: function () {
            var t = this;
            return t.layerPop.getDom();
        },
        close: function () {
            var t = this;
            t.layerPop.close();
        }
    };
    /**
     * 弹出浮窗
     * @param target 指定dom元素
     * @param html 浮窗内容
     * @param options(选填) {close: 是否有关闭按钮}
     * 调用方法:var layer = new EH.LayerPop();
     */
    var LayerPop = function (target, html, options) {
        this.$target = $(target);
        this.$dom = null;
        this.html = html;
        this.options = $.extend({
            close: false
        }, options);
        this.dialog = null;
        this.layer_arrow = null;
        this.show();
    };
    LayerPop.prototype = {
        show: function () {
            var t = this;
            if (!t.dialog) {
                t.render();
                t.renderAr();
                t.renderArLine();
                t.bindEvent();
                if (t.options.close) {
                    t.bindEvent2();
                } else {
                    t.bindEvent1();
                }
            }
            t.dialog.show();
        },
        bindEvent1: function () {
            var t = this;

            var isShow = false;
            var timer1 = null;
            var timer2 = null;

            t.popTarMouseenter = function () {
                isShow = true;
                clearTimeout(timer1);
                clearTimeout(timer2);
                t.show();
            };
            t.popTarMouseleave = function () {
                isShow = false;
                timer1 = setTimeout(function () {
                    t.close();
                }, 500);
            };
            t.popDomMouseenter = function () {
                isShow = true;
                clearTimeout(timer1);
                clearTimeout(timer2);
                t.show();
            };
            t.popDomMouseleave = function () {
                isShow = false;
                timer2 = setTimeout(function () {
                    t.close();
                }, 500);
            };

            t.$target.mouseenter(t.popTarMouseenter)
                .mouseleave(t.popTarMouseleave);

            t.$dom.mouseenter(t.popDomMouseenter)
                .mouseleave(t.popDomMouseleave);
        },
        bindEvent: function () {
            var t = this;

            t.clickBlank = function (e) {
                if (t.$dom) {
                    var target = $(e.target);
                    if (e.target !== t.$target[0]) {
                        if (target.closest(t.$dom).length === 0) {
                            t.close();
                        }
                    }
                    target = null;
                }
            };
            $(document.body).click(t.clickBlank);
        },
        bindEvent2: function () {
            var t = this;

            t.buttonClose = function () {
                t.close();
            };
            t.$dom.on('click', '.eh_dialog_layer_pop_content_close', t.buttonClose);
        },
        render: function () {
            var t = this;

            t.$dom = $(T_everhome({
                tpl: 'layer_pop',
                options: t.options
            }));
            t.$dom.find('.eh_dialog_layer_pop_content_inner').html(t.html);
            var offset = t.$target.offset();
            t.dialog = new EverHome.Dialog({
                title: null,
                content: t.$dom,
                mask: false,
                close: false,
                css: {
                    top: offset.top + t.$target.height() + 12,
                    left: offset.left,
                    backgroundColor: '#FFF',
                    boxShadow: '0px 1px 8px #C0C0C0',
                    padding: '5 10 10 10',
                    border: 'none',
                    position: 'absolute'
                },
                onResize: false
            });
        },
        renderAr: function () {
            var t = this;
            t.$dom.find('.eh_dialog_layer_pop_arrow').css({
                left: t.$target.width() / 2 - 10
            });
        },
        renderArLine: function () {
            var t = this;
            t.$dom.find('.eh_dialog_layer_pop_arrow_line').css({
                left: t.$target.width() / 2 - 10
            });
        },
        getDom: function () {
            var t = this;
            return t.$dom;
        },
        isValid: function () {
            var t = this;
            return !!t.$dom;
        },
        close: function () {
            var t = this;
            if (t.isValid()) {
                t.$target.off('mouseenter', t.popTarMouseenter);
                t.$target.off('mouseleave', t.popTarMouseleave);
                t.$dom.off('click', t.buttonClose);
                $(document.body).off('click', t.clickBlank);
                t.$dom = null;
                t.dialog.close();
                t.dialog = null;
            }
        }
    };

    /**
     * 全屏弹出窗口
     * 调用方法: dialog = new EH.FullDialog();
     *          dialog.ready(function(){
     *              dialog.setContent($dom);
     *          });
     *          dialog.show();
     */
    var FullDialog = function () {
        this.mask = null;
        this.$dom = null;

        this.event = {};
        this.event.onClose = null;
        this.event.onReSize = null;

        this.onReady = null;
    };
    FullDialog.prototype = {
        show: function () {
            var t = this;
            t.$dom = $(T_everhome({
                tpl: 'full_screen'
            }));
            t.mask = new Mask();
            $(document.body).append(t.$dom);
            EverHome.Scroll.fixBodyHtmlScroll();
            t.reSize();
            t.bindEvent();
            if (t.onReady) {
                t.onReady();
            }
        },
        ready: function (callback) {
            this.onReady = callback;
        },
        setContent: function (html) {
            this.$dom.find('.eh_dialog_full_screen_content>div').html(html);
        },
        getContentContainer: function () {
            return this.$dom.find('.eh_dialog_full_screen_content>div')[0];
        },
        bindEvent: function () {
            var t = this;
            this.event.onClose = function () {
                t.close();
            };

            var timer = null;
            this.event.onReSize = function () {
                clearTimeout(timer);
                timer = setTimeout(function () {
                    t.reSize();
                }, 500);
            };

            this.$dom.on('click', '.eh_dialog_full_screen_close', this.event.onClose);
            $(window).on('resize', this.event.onReSize);

            // this.$dom.find('.eh_dialog_full_screen_content').scroll(function(event) {
            //     Scroll.fixScroll($(this), $(this).find('.eh_dialog_full_screen_content_inner'));
            // });
        },
        reSize: function () {
            var cH = document.documentElement.clientHeight;
            var cW = document.documentElement.clientWidth;

            var dw = this.$dom.width();

            this.$dom.find('.eh_dialog_full_screen_content').css({
                height: cH - 60
            });
            this.$dom.css({
                left: (cW - dw) / 2
            });
        },
        close: function () {
            EverHome.Scroll.unFixBodyHtmlScroll();
            this.mask.close();
            this.$dom.off('click', this.event.onClose);
            this.$dom.remove();
            this.$dom = null;
            $(window).off('resize', this.event.onReSize);
        }
    };

    /**
     * 遮罩层
     * @param opacity 透明度
     * 调用方法: var mask = new EH.Mask();
     */
    var Mask = function (opacity) {
        this.$dom = null;
        this.opacity = opacity || 0.5;
        this.show();
    };
    Mask.prototype = {
        show: function () {
            this.$dom = $('<div class="eh_mask_full_screen"></div>');
            this.$dom.fadeTo(0, this.opacity);
            $(document.body).append(this.$dom);
        },
        close: function () {
            this.$dom.remove();
        }
    };

    var Base64 = (function () {
        var obj = {};

        (function (global) {
            'use strict';
            // existing version for noConflict()
            var _Base64 = global.Base64;
            var version = "2.1.5";
            // if node.js, we use Buffer
            var buffer;
            // if (typeof module !== 'undefined' && module.exports) {
            //     buffer = require('buffer').Buffer;
            // }
            // constants
            var b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
            var b64tab = function (bin) {
                var t = {};
                for (var i = 0, l = bin.length; i < l; i++) t[bin.charAt(i)] = i;
                return t;
            }(b64chars);
            var fromCharCode = String.fromCharCode;
            // encoder stuff
            var cb_utob = function (c) {
                if (c.length < 2) {
                    var cc = c.charCodeAt(0);
                    return cc < 0x80 ? c : cc < 0x800 ? (fromCharCode(0xc0 | (cc >>> 6)) + fromCharCode(0x80 | (cc & 0x3f))) : (fromCharCode(0xe0 | ((cc >>> 12) & 0x0f)) + fromCharCode(0x80 | ((cc >>> 6) & 0x3f)) + fromCharCode(0x80 | (cc & 0x3f)));
                } else {
                    var cc = 0x10000 + (c.charCodeAt(0) - 0xD800) * 0x400 + (c.charCodeAt(1) - 0xDC00);
                    return (fromCharCode(0xf0 | ((cc >>> 18) & 0x07)) + fromCharCode(0x80 | ((cc >>> 12) & 0x3f)) + fromCharCode(0x80 | ((cc >>> 6) & 0x3f)) + fromCharCode(0x80 | (cc & 0x3f)));
                }
            };
            var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
            var utob = function (u) {
                return u.replace(re_utob, cb_utob);
            };
            var cb_encode = function (ccc) {
                var padlen = [0, 2, 1][ccc.length % 3],
                    ord = ccc.charCodeAt(0) << 16 | ((ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8) | ((ccc.length > 2 ? ccc.charCodeAt(2) : 0)),
                    chars = [
                        b64chars.charAt(ord >>> 18),
                        b64chars.charAt((ord >>> 12) & 63),
                        padlen >= 2 ? '=' : b64chars.charAt((ord >>> 6) & 63),
                        padlen >= 1 ? '=' : b64chars.charAt(ord & 63)
                    ];
                return chars.join('');
            };
            var btoa = global.btoa ? function (b) {
                return global.btoa(b);
            } : function (b) {
                return b.replace(/[\s\S]{1,3}/g, cb_encode);
            };
            var _encode = buffer ? function (u) {
                return (new buffer(u)).toString('base64')
            } : function (u) {
                return btoa(utob(u))
            };
            var encode = function (u, urisafe) {
                return !urisafe ? _encode(u) : _encode(u).replace(/[+\/]/g, function (m0) {
                    return m0 == '+' ? '-' : '_';
                }).replace(/=/g, '');
            };
            var encodeURI = function (u) {
                return encode(u, true)
            };
            // decoder stuff
            var re_btou = new RegExp([
                '[\xC0-\xDF][\x80-\xBF]',
                '[\xE0-\xEF][\x80-\xBF]{2}',
                '[\xF0-\xF7][\x80-\xBF]{3}'
            ].join('|'), 'g');
            var cb_btou = function (cccc) {
                switch (cccc.length) {
                    case 4:
                        var cp = ((0x07 & cccc.charCodeAt(0)) << 18) | ((0x3f & cccc.charCodeAt(1)) << 12) | ((0x3f & cccc.charCodeAt(2)) << 6) | (0x3f & cccc.charCodeAt(3)),
                            offset = cp - 0x10000;
                        return (fromCharCode((offset >>> 10) + 0xD800) + fromCharCode((offset & 0x3FF) + 0xDC00));
                    case 3:
                        return fromCharCode(
                            ((0x0f & cccc.charCodeAt(0)) << 12) | ((0x3f & cccc.charCodeAt(1)) << 6) | (0x3f & cccc.charCodeAt(2))
                        );
                    default:
                        return fromCharCode(
                            ((0x1f & cccc.charCodeAt(0)) << 6) | (0x3f & cccc.charCodeAt(1))
                        );
                }
            };
            var btou = function (b) {
                return b.replace(re_btou, cb_btou);
            };
            var cb_decode = function (cccc) {
                var len = cccc.length,
                    padlen = len % 4,
                    n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0) | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0) | (len > 2 ? b64tab[cccc.charAt(2)] << 6 : 0) | (len > 3 ? b64tab[cccc.charAt(3)] : 0),
                    chars = [
                        fromCharCode(n >>> 16),
                        fromCharCode((n >>> 8) & 0xff),
                        fromCharCode(n & 0xff)
                    ];
                chars.length -= [0, 0, 2, 1][padlen];
                return chars.join('');
            };
            var atob = global.atob ? function (a) {
                return global.atob(a);
            } : function (a) {
                return a.replace(/[\s\S]{1,4}/g, cb_decode);
            };
            var _decode = buffer ? function (a) {
                return (new buffer(a, 'base64')).toString()
            } : function (a) {
                return btou(atob(a))
            };
            var decode = function (a) {
                return _decode(
                    a.replace(/[-_]/g, function (m0) {
                        return m0 == '-' ? '+' : '/'
                    })
                        .replace(/[^A-Za-z0-9\+\/]/g, '')
                );
            };
            var noConflict = function () {
                var Base64 = global.Base64;
                global.Base64 = _Base64;
                return Base64;
            };
            // export Base64
            global.Base64 = {
                VERSION: version,
                atob: atob,
                btoa: btoa,
                fromBase64: decode,
                toBase64: encode,
                utob: utob,
                encode: encode,
                encodeURI: encodeURI,
                btou: btou,
                decode: decode,
                noConflict: noConflict
            };
            // if ES5 is available, make Base64.extendString() available
            if (typeof Object.defineProperty === 'function') {
                var noEnum = function (v) {
                    return {
                        value: v,
                        enumerable: false,
                        writable: true,
                        configurable: true
                    };
                };
                global.Base64.extendString = function () {
                    Object.defineProperty(
                        String.prototype, 'fromBase64', noEnum(function () {
                            return decode(this)
                        }));
                    Object.defineProperty(
                        String.prototype, 'toBase64', noEnum(function (urisafe) {
                            return encode(this, urisafe)
                        }));
                    Object.defineProperty(
                        String.prototype, 'toBase64URI', noEnum(function () {
                            return encode(this, true)
                        }));
                };
            }
            // that's it!
        })(obj);
        return obj.Base64;
    })();

    var sha256 = function (str) {
        function rotateRight(n, x) {
            return ((x >>> n) | (x << (32 - n)));
        }

        function choice(x, y, z) {
            return ((x & y) ^ (~x & z));
        }

        function majority(x, y, z) {
            return ((x & y) ^ (x & z) ^ (y & z));
        }

        function sha256_Sigma0(x) {
            return (rotateRight(2, x) ^ rotateRight(13, x) ^ rotateRight(22, x));
        }

        function sha256_Sigma1(x) {
            return (rotateRight(6, x) ^ rotateRight(11, x) ^ rotateRight(25, x));
        }

        function sha256_sigma0(x) {
            return (rotateRight(7, x) ^ rotateRight(18, x) ^ (x >>> 3));
        }

        function sha256_sigma1(x) {
            return (rotateRight(17, x) ^ rotateRight(19, x) ^ (x >>> 10));
        }

        function sha256_expand(W, j) {
            return (W[j & 0x0f] += sha256_sigma1(W[(j + 14) & 0x0f]) + W[(j + 9) & 0x0f] +
                sha256_sigma0(W[(j + 1) & 0x0f]));
        }

        /* Hash constant words K: */
        var K256 = new Array(
            0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
            0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
            0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
            0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
            0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
            0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
            0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
            0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
            0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
            0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
            0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
            0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
            0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
            0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
            0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
            0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
        );

        /* global arrays */
        var ihash, count, buffer;
        var sha256_hex_digits = "0123456789abcdef";

        /* Add 32-bit integers with 16-bit operations (bug in some JS-interpreters: 
         overflow) */
        function safe_add(x, y) {
            var lsw = (x & 0xffff) + (y & 0xffff);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xffff);
        }

        /* Initialise the SHA256 computation */
        function sha256_init() {
            ihash = new Array(8);
            count = new Array(2);
            buffer = new Array(64);
            count[0] = count[1] = 0;
            ihash[0] = 0x6a09e667;
            ihash[1] = 0xbb67ae85;
            ihash[2] = 0x3c6ef372;
            ihash[3] = 0xa54ff53a;
            ihash[4] = 0x510e527f;
            ihash[5] = 0x9b05688c;
            ihash[6] = 0x1f83d9ab;
            ihash[7] = 0x5be0cd19;
        }


        /* Transform a 512-bit message block */
        function sha256_transform() {
            var a, b, c, d, e, f, g, h, T1, T2;
            var W = new Array(16);

            /* Initialize registers with the previous intermediate value */
            a = ihash[0];
            b = ihash[1];
            c = ihash[2];
            d = ihash[3];
            e = ihash[4];
            f = ihash[5];
            g = ihash[6];
            h = ihash[7];

            /* make 32-bit words */
            for (var i = 0; i < 16; i++)
                W[i] = ((buffer[(i << 2) + 3]) | (buffer[(i << 2) + 2] << 8) | (buffer[(i << 2) + 1] << 16) | (buffer[i << 2] << 24));

            for (var j = 0; j < 64; j++) {
                T1 = h + sha256_Sigma1(e) + choice(e, f, g) + K256[j];
                if (j < 16) T1 += W[j];
                else T1 += sha256_expand(W, j);
                T2 = sha256_Sigma0(a) + majority(a, b, c);
                h = g;
                g = f;
                f = e;
                e = safe_add(d, T1);
                d = c;
                c = b;
                b = a;
                a = safe_add(T1, T2);
            }

            /* Compute the current intermediate hash value */
            ihash[0] += a;
            ihash[1] += b;
            ihash[2] += c;
            ihash[3] += d;
            ihash[4] += e;
            ihash[5] += f;
            ihash[6] += g;
            ihash[7] += h;
        }

        /* Read the next chunk of data and update the SHA256 computation */
        function sha256_update(data, inputLen) {
            var i, index, curpos = 0;
            /* Compute number of bytes mod 64 */
            index = ((count[0] >> 3) & 0x3f);
            var remainder = (inputLen & 0x3f);

            /* Update number of bits */
            if ((count[0] += (inputLen << 3)) < (inputLen << 3)) count[1]++;
            count[1] += (inputLen >> 29);

            /* Transform as many times as possible */
            for (i = 0; i + 63 < inputLen; i += 64) {
                for (var j = index; j < 64; j++)
                    buffer[j] = data.charCodeAt(curpos++);
                sha256_transform();
                index = 0;
            }

            /* Buffer remaining input */
            for (var j = 0; j < remainder; j++)
                buffer[j] = data.charCodeAt(curpos++);
        }

        /* Finish the computation by operations such as padding */
        function sha256_final() {
            var index = ((count[0] >> 3) & 0x3f);
            buffer[index++] = 0x80;
            if (index <= 56) {
                for (var i = index; i < 56; i++)
                    buffer[i] = 0;
            } else {
                for (var i = index; i < 64; i++)
                    buffer[i] = 0;
                sha256_transform();
                for (var i = 0; i < 56; i++)
                    buffer[i] = 0;
            }
            buffer[56] = (count[1] >>> 24) & 0xff;
            buffer[57] = (count[1] >>> 16) & 0xff;
            buffer[58] = (count[1] >>> 8) & 0xff;
            buffer[59] = count[1] & 0xff;
            buffer[60] = (count[0] >>> 24) & 0xff;
            buffer[61] = (count[0] >>> 16) & 0xff;
            buffer[62] = (count[0] >>> 8) & 0xff;
            buffer[63] = count[0] & 0xff;
            sha256_transform();
        }

        /* Split the internal hash values into an array of bytes */
        function sha256_encode_bytes() {
            var j = 0;
            var output = new Array(32);
            for (var i = 0; i < 8; i++) {
                output[j++] = ((ihash[i] >>> 24) & 0xff);
                output[j++] = ((ihash[i] >>> 16) & 0xff);
                output[j++] = ((ihash[i] >>> 8) & 0xff);
                output[j++] = (ihash[i] & 0xff);
            }
            return output;
        }

        /* Get the internal hash as a hex string */
        function sha256_encode_hex() {
            var output = new String();
            for (var i = 0; i < 8; i++) {
                for (var j = 28; j >= 0; j -= 4)
                    output += sha256_hex_digits.charAt((ihash[i] >>> j) & 0x0f);
            }
            return output;
        }

        /* Main function: returns a hex string representing the SHA256 value of the 
         given data */
        function sha256_digest(data) {
            sha256_init();
            sha256_update(data, data.length);
            sha256_final();
            return sha256_encode_hex();
        }

        /* test if the JS-interpreter is working properly */
        function sha256_self_test() {
            return sha256_digest("message digest") ==
                "f7846f55cf23e14eebeab5b4e1550cad5b509e3348fbc4efa3a1413d393cb650";
        }

        return sha256_digest(str);
    };

    var string = {

        parseFace: function (str) {
            if (!str) {
                return '';
            }
            return str.replace(/\[(smiley_[0-9]+)\]/g, '<img class="face" src="' + basePath + '/pub/js/editer/images/face/$1.png">');
        },

        /**
         * 去掉字符串首尾空格
         */
        trim: function (str) {
            return $.trim(str);
        },
        /**
         * 生成带传入链接的<a>标签
         */
        parseURL: function (str) {
            if (!str) {
                return '';
            }
            // 暂时取消 没有http开头的字符串。 后续优化方案
            return str.replace(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?#%&=]*)?/gm, function (m) {
                if (m.indexOf('http') === 0) {
                    return '<a href="' + m + '">' + m + '</a>';
                } else {
                    return '<a href="http://' + m + '">' + m + '</a>';
                }
            });
        },
        fixBigNum2JSON: function (str) {
            if (!str) {
                return '';
            }
            return EverHome.JSON.str2json(str);
        },
        hasBigNumForJSONStr: function (str) {
            if (str) {
                return !!str.match(/([^\\])":(\d{15,})/g);
            }
            return false;
        },
        /**
         * 换行符转<br>
         */
        lf2br: function (str) {
            if (!str) {
                return '';
            }
            return str.replace(/\n/gm, '<br>');
        },
        /**
         * 判断是否为手机号位数
         */
        isPhoneNum: function (str) {
            if (!str) {
                return false;
            }
            return str.replace(/\d{11}/, '') === '';
        },
        /**
         * 手机号加密中间四位
         */
        phoneNumDim: function (str) {
            if (!str) {
                return false;
            }
            return str.substring(0, 3) + "****" + str.substring(7, 11);
        },
        /**
         * 判断是否为数字
         */
        isNum: function (str) {
            if (!str) {
                return false;
            }
            return str.replace(/\d+/, '') === '';
        },
        /**
         * sha256加密
         */
        sha256: sha256,
        /**
         * Base64编码，具体方法需查看Base64的function
         */
        Base64: Base64,
        /**
         * 截取url中相应字段
         */
        getParamter: function (name, url) {
            if (url === undefined) {
                url = location.href;
            }
            var r = new RegExp("(\\?|#|&)" + name + "=([^&#]*)(&|#|$)");
            var m = url.match(r);
            return (!m ? "" : m[2]);
        },
        hash2json: function (hash) {
            if (hash === undefined) {
                hash = window.location.hash;
            }
            var json = {};
            var arr = hash.replace(/^#/, '').split('&');
            $.each(arr, function (index, ele) {
                var temp = ele.split('=');
                if (temp[0]) {
                    json[temp[0]] = temp[1] || '';
                }
            });
            return json;
        },
        json2hash: function (json) {
            var result = '';
            for (var ele in json) {
                result += ele + '=' + json[ele] + '&';
            }
            return '#' + result.slice(0, result.length - 1);
        },
        /**
         * 给指定的数字补充指定位数的0
         * @param num 需要补充0的数
         * @param len 规定的长度
         */
        supplement: function (num, len) {
            num = '' + num;
            if (len - num.length <= 0) {
                return num;
            }
            return (new Array(len - num.length + 1)).join('0') + num;
        },
        /**
         * 给指定的数组补充指定位数的0
         * @param nums 需要补充0的数组
         * @param len 规定的长度
         */
        supplements: function (nums, len) {
            var result = [];
            $.each(nums, function (index, ele) {
                result.push(EverHome.string.supplement(ele, len));
            });
            return result;
        },
        /**
         * 将字符转换成十六进制
         */
        toHex: function (str) {
            var res = [];
            for (var i = 0; i < str.length; i++)
                res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
            return "\\u" + res.join("\\u");
        }
    };

    var RichText = {
        getLength: function () {

        },
        slice: function () {

        },
        str2HTML: function (str) {
            if (!str) {
                return '';
            }
            return string.parseURL(string.lf2br(str));
        }
    };

    var Time;
    Time = {
        getTimeStr: function (time) {
            // time 数字
            var sendTime = new Date(time);
            var nowTime = new Date();

            var oneMin = 1 * 60 * 1000;
            var fiveMin = 5 * oneMin;
            var oneHour = 60 * oneMin;

            var y = sendTime.getFullYear();
            var m = sendTime.getMonth() + 1;
            var d = sendTime.getDate();
            var h = sendTime.getHours();
            var min = sendTime.getMinutes();
            m = m < 10 ? '0' + m : m;
            d = d < 10 ? '0' + d : d;
            h = h < 10 ? '0' + h : h;
            min = min < 10 ? '0' + min : min;

            var dif = nowTime - sendTime;
            var dateDif = nowTime.getDate() - sendTime.getDate();

            var str = null;
            if (dif > 0) {
                if (dif <= fiveMin) {
                    str = '刚刚';
                } else if (dif < oneHour) {
                    str = Math.floor(dif / 60000) + '分钟前';
                } else if (dateDif === 0) {
                    str = h + ':' + min;
                } else if (dateDif === 1) {
                    str = '昨天' + h + ':' + min;
                } else {
                    str = y + '-' + m + '-' + d + ' ' + h + ':' + min;
                }
            } else {
                if (-dif < fiveMin) {
                    str = '刚刚';
                } else if (-dif < oneHour) {
                    str = Math.floor(-dif / 60000) + '分钟后';
                } else if (-dateDif === 0) {
                    str = h + ':' + min;
                } else if (-dateDif === 1) {
                    str = '明天' + h + ':' + min;
                } else {
                    str = y + '-' + m + '-' + d + ' ' + h + ':' + min;
                }
            }
            return str;
        },
        getTimeStrAll: function (time) {
            var offset = new Date().getTimezoneOffset() * 60000;
            var date = new Date(time + offset);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            var d = date.getDate();
            m = m < 10 ? '0' + m : m;
            d = d < 10 ? '0' + d : d;
            var h = date.getHours();
            if (h < 10) {
                h = '0' + h;
            }
            var min = date.getMinutes();
            if (min < 10) {
                min = '0' + min;
            }
            var sec = date.getSeconds();
            if (sec < 10) {
                sec = '0' + sec;
            }
            return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + sec;
        },
        // new Date('2014-11-19') new Date('2014-11-19 11:00') 得到的小时是8点，故fix
        fixDateStr: function (str, separator) {
            str = $.trim(str);
            if (str === '') {
                return null;
            }
            if (str.indexOf(':') === -1) {
                str += ' 00:00';
            }
            return new Date(str);
        },
        getBirthdayStr: function (datestr) {
            var date = new Date(datestr);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            var d = date.getDate();
            m = m < 10 ? '0' + m : m;
            d = d < 10 ? '0' + d : d;
            return y + '-' + m + '-' + d;
        },
        getHourMin: function (datestr) {
            var date = new Date(datestr);
            var h = date.getHours();
            var min = date.getMinutes();
            h = h < 10 ? '0' + h : h;
            min = min < 10 ? '0' + min : min;
            return h + ':' + min;
        }
    };

    var Scroll = {
        /**
         * 返回body滚动条的垂直位置
         */
        getScroll: function () {
            return document.body.scrollTop;
        },
        /**
         * 滚动翻页（设置body滚动条的垂直位置为滚动条长度）
         */
        scrollPage: function () {
            Scroll.setScroll(document.documentElement.clientHeight);
        },
        /**
         * 设置body滚动条的垂直位置
         */
        setScroll: function (value) {
            document.body.scrollTop = value;
        },
        /**
         * 返回body顶部（设置body滚动条的垂直位置为0）
         */
        setScrollTop: function () {
            Scroll.setScroll(0);
        },
        /**
         * 返回body底部
         */
        setScrollBottom: function () {
            Scroll.setScroll($(document.body).height());
        },
        // 待完善
        // 这里会影响内容页的padding,待考虑
        // 不建议使用
        fixScroll: function (container, content) {

            var $t = $(container);
            var $c = $(content);
            var top = $t.scrollTop();
            var max = $c.height() - $t.height();

            $c.css({
                paddingTop: 10,
                paddingBottom: 10
            });

            if (top >= max) {
                $t.scrollTop(max);
            } else if (top <= 10) {
                $t.scrollTop(10);
            }
        },
        fixBodyHtmlScroll: function () {
            var $dom = null;
            if ($(document.body).css('overflow-y') == 'scroll') {
                $dom = $(document.body);
            } else if ($('html').css('overflow-y') == 'scroll') {
                $dom = $('html');
            }
            if ($dom) {
                $dom.attr('_fix_scroll', '1');
                $dom.css({
                    overflowY: 'hidden',
                    marginRight: EverHome.Scroll.getScrollWidth()
                });
            }
        },
        unFixBodyHtmlScroll: function () {
            var $dom = null;
            if ($(document.body).attr('_fix_scroll') == '1') {
                $dom = $(document.body);
            } else if ($('html').attr('_fix_scroll') == '1') {
                $dom = $('html');
            }
            if ($dom) {
                $dom.css({
                    overflowY: 'scroll',
                    marginRight: 0
                });
            }
        },
        getScrollWidth: (function () {
            var sw = null;
            return function () {
                if (sw) {
                    return sw;
                }
                var $d = $('<div><div></div></div>');
                $d.css({
                    width: 100,
                    height: 100,
                    overflowY: 'scroll',
                    position: 'fixed',
                    top: -300
                });
                $d.find('div').css({
                    height: 200
                });
                $(document.body).append($d);
                sw = $d.width() - $d.find('div').width();
                $d.remove();
                return sw;
            };
        })()
    };

    /**
     * 只有旧个人版才能用。新版用EHB。getUserInfo 方法
     */
    var getMyInfo = (function () {
        var info = {
            id: null,
            name: null,
            avatar: null,
            familyId: null
        };

        return function () {
            if (info.id) {
                return info;
            }

            var $userInfo = $('.userInfo');
            info.id = $userInfo.attr('userid');
            info.name = $userInfo.find('.title').text();
            info.familyId = $userInfo.attr('myfamilyid');
            info.avatar = $userInfo.find('>img').attr('src');
            if (EverHome.string.trim(info.avatar) === '') {
                info.avatar = '/images/common/defFaceImg.png';
            }

            return info;
        };
    })();

    var Canvas = {
        supportCanvas: function () {
            var c = $('<canvas></canvas>')[0];
            if (c.getContext && c.getContext('2d')) {
                return true;
            }
            return false;
        }
    };

    /**
     * 弹出窗口
     * @param config = {title:标题,content:弹出框内容,mask:遮罩层,close:是否有关闭按钮,css:整体样式,type:窗口主题,基于bootstrap}
     * 调用方法:var dailog = new EH.Dialog(config);
     *         dialog.show();
     */
    var Dialog = function (config) {
        this.config = {
            // width: null,
            // height: null,
            title: null,
            content: '',
            mask: true,
            close: true,
            css: null,
            type: 'primary',
            onResize: true
        };
        $.extend(this.config, config);

        this.$dom = null;

        this.mask = null;

        this.onReady = null;
        this.event = {
            onClose: null,
            onReSize: null
        };
    };
    Dialog.prototype = {
        show: function () {
            var t = this;

            if (t.$dom) {
                return;
            }

            if (t.config.mask) {
                t.mask = new EverHome.Mask();
            }

            t.$dom = $(T_everhome({
                data: t.config,
                tpl: 'dialog'
            }));

            t.$dom.css(t.config.css || {});

            t.$dom.find('.eh_dialog_content_inner').html(t.config.content);
            $(document.body).append(t.$dom);

            t.$dom.find('.eh_dialog_content').height(t.$dom.height() - (t.config.title ? 30 : 0));

            if (t.config.onResize) {
                t.reSize();
            }

            if (t.config.title) {
                t.drag(t.$dom, t.$dom.find('.eh_dialog_title h3'), true);
            }

            t.bindEvent();

            if (t.onReady) {
                t.onReady();
            }
        },
        ready: function (callback) {
            this.onReady = callback;
        },
        reSize: function () {
            var cH = document.documentElement.clientHeight;
            var cW = document.documentElement.clientWidth;

            var dw = this.$dom.width();
            var dh = this.$dom.height();

            this.$dom.css({
                top: (cH - dh) / 2,
                left: (cW - dw) / 2
            });
        },
        bindEvent: function () {
            var t = this;

            this.event.onClose = function () {
                t.close();
            };
            this.$dom.on('click', '.eh_dialog_close', this.event.onClose);

            if (t.config.onResize) {
                var timer = null;
                this.event.onReSize = function () {
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        if (t.isValid()) {
                            t.reSize();
                        }
                    }, 500);
                };
                $(window).on('resize', this.event.onReSize);
            }
        },
        isValid: function () {
            var t = this;
            return !!t.$dom;
        },
        close: function () {
            if (this.isValid()) {
                this.mask && this.mask.close();
                this.$dom.off('click');
                this.$dom.remove();
                this.$dom = null;
                $(window).off('resize', this.event.onReSize);
            }
        },
        drag: function (target, hoverTarget, limit) {
            var t = this;
            limit = limit === false ? false : true;
            var $target = $(target);
            var dis = {
                x: 0,
                y: 0
            };
            var timer;
            var mm = function (event) {
                var cH = document.body.clientHeight;
                var cW = document.body.clientWidth;
                var left = event.clientX - dis.x - $target.parent().offset().left;
                var top = event.clientY - dis.y - $target.parent().offset().top - EverHome.Scroll.getScroll();
                if (limit) {
                    left = left < 0 ? 0 : left;
                    top = top < 0 ? 0 : top;
                    left = left > ($target.parent().width() - $target.width()) ? $target.parent().width() - $target.width() : left;
                    top = top > ($target.parent().height() - $target.height()) ? $target.parent().height() - $target.height() : top;
                }
                timer = setTimeout(function () {
                    $target.css({
                        'left': left,
                        'top': top
                    });
                }, 10);
                return false;
            };
            var mu = function () {
                $target.css("cursor", "default");
                $(document).unbind("mousemove", mm).unbind("mouseup", mu);
            };


            $target.bind("mousedown", function (event) {
                if (event.target == $(hoverTarget)[0]) {
                    $target.css("cursor", "move");
                    dis.x = event.clientX - $target.offset().left;
                    dis.y = event.clientY - $target.offset().top;
                    $(document).bind("mousemove", mm).bind("mouseup", mu);
                    return false;
                }
            });
        },
        getDom: function () {
            return this.$dom;
        }
    };

    var _alertDialogArray = [];

    /**
     * 显示带有一条指定消息的警告框
     * @param word 指定的消息
     * @param type success info warning danger
     * @param options(选填) time: 警告持续的时间, needClose: 是否需要手动关闭
     * 调用方法: EH.Alert();
     */
    var Alert = function (word, type, options) {

        options = $.extend({
            time: 2000, // 数字或者false
            needClose: false
        }, options);

        var dialog = null;

        var $dom = $(T_everhome({
            tpl: 'alert',
            type: type,
            word: word,
            needClose: options.needClose
        }));
        $dom.on('click', '.eh_alert_close', function () {
            dialog.close();
            Alert.clear(dialog);
        });
        dialog = new EverHome.Dialog({
            title: null,
            close: false,
            mask: false,
            content: $dom,
            css: {
                background: 'none',
                border: 'none'
            }
        });
        dialog.ready(function () {
            if (options.time) {
                setTimeout(function () {
                    dialog.close();
                    Alert.clear(dialog);
                }, options.time);
            }
        });
        dialog.show();

        Alert.add(dialog);

        return dialog;
    };
    Alert.size = function () {
        return _alertDialogArray.length;
    };
    Alert.add = function (o) {
        _alertDialogArray.push(o);
    };
    Alert.clear = function (o) {
        if (o) {
            if (!Array.prototype.indexOf)   // ie8 重写indexOf()
            {
                Array.prototype.indexOf = function (elt /*, from*/) {
                    var len = this.length >>> 0;
                    var from = Number(arguments[1]) || 0;
                    from = (from < 0)
                        ? Math.ceil(from)
                        : Math.floor(from);
                    if (from < 0)
                        from += len;
                    for (; from < len; from++) {
                        if (from in this &&
                            this[from] === elt)
                            return from;
                    }
                    return -1;
                };
            }
            var index = _alertDialogArray.indexOf(o);
            if (index > -1) {
                _alertDialogArray.splice(index, 1);
            }
        } else {
            $.each(_alertDialogArray, function (index, ele) {
                ele.close();
            });
            _alertDialogArray = [];
        }
    };

    /**
     * 显示一个带有指定消息和 OK 及取消按钮的对话框
     * @param word 指定的消息
     * @param suc 成功后操作
     * @param err 失败后操作
     * @param title 提示标题
     * 调用方法: EH.Confirm();
     */

    var Confirm = function (word, suc, err, title) {

        var dialog = null;

        var $dom = $('<div class="eh_confirm"><div class="eh_confirm_content"><p></p></div><div class="eh_confirm_button"><a href="javascript:void(0);" class="eh_confirm_button_cancel">取消</a><a href="javascript:void(0);" class="eh_confirm_button_ok">确定</a></div></div>');

        $dom.find('.eh_confirm_content>p').html(word);

        $dom.on('click', '.eh_confirm_button_ok', function () {
            if (suc) {
                // 返回false 不关闭对话框
                if (suc() === false) {
                    return;
                }
            }

            dialog.close();
        }).on('click', '.eh_confirm_button_cancel', function () {
            err && err();
            dialog.close();
        });

        dialog = new EverHome.Dialog({
            title: title,
            close: true,
            mask: false,
            content: $dom,
            css: {}
        });
        dialog.show();

        return dialog;
    };

    /**
     * 校验用户进行输入的对话框
     * @param que 需要校验的问题
     * @param ans 校验的答案
     * @param suc 验证成功后的操作
     * @param err 出错时的操作
     * @param title 对话框标题
     * 调用方法: EH.Prompt();
     */

    var Prompt = function (que, ans, suc, err, title) {
        var dialog = null;
        var $dom = $('<div class="eh_prompt"><div class="eh_prompt_content"><p></p><input type = "text" class="form-control"/></div><div class="eh_prompt_btn"><a href = "javascript:void(0)" class="eh_prompt_btn_cancel">取消</a><a href = "javascript:void(0)" class="eh_prompt_btn_ok">确定</a></div></div>');

        $dom.find('.eh_prompt_content>p').html(que);

        $dom.on('click', '.eh_prompt_btn_ok', function () {
            if (suc) {
                var input = $dom.find('.eh_prompt_content>input').val();
                if (ans !== input) {
                    EH.Alert('输入错误，请重新输入！', 'warning');
                    $dom.find('.eh_prompt_content>input').val('').focus();
                    return;
                } else {
                    EH.Alert('验证通过', 'success');
                    suc();
                }
            }
            dialog.close();
        }).on('click', '.eh_prompt_btn_cancel', function () {
            err && err();
            dialog.close();
        });

        dialog = new EverHome.Dialog({
            title: title,
            close: true,
            mask: false,
            content: $dom,
            css: {}
        });
        dialog.show();
        $dom.find('.eh_prompt_content>input').focus();
    };

    var Logger = (function () {

        var can = window.location.href.indexOf('www.everhomes.com') == -1 || window.location.href.indexOf('DEBUG') > -1;

        var log = (function () {
            if (can && window.console && window.console.log) {
                return function (txt) {
                    console.log(txt);
                };
            }
            return function () {
            };
        })();

        return {
            log: log
        };
    })();
    /**
     * 给定url下载链接
     * @type {{down: Function(url)}}
     */
    var DownLoad = {
        down: function (url) {
            var $iframe = $('<iframe></iframe>');
            $iframe.css({
                position: 'fixed',
                top: -10000,
                left: -10000
            });
            $(document.body).append($iframe);
            $iframe[0].contentWindow.location = url;
        }
    };

    var JSON = {
        str2json: function (str) {
            if (!str) {
                return {};
            }
            // bignum = Math.pow(2, 53)    length:16
            str = str.replace(/([^\\])":(\d{15,})/g, '$1":"$2"');
            return $.parseJSON(str);
        },
        json2str: function (obj) {
            return $.toJSON(obj);
        }
    };

    var Schedule = {};

    Schedule.RunOnceAsync = function (fun) {
        // 0没运行 1运行中 2已运行
        this.status = 0;
        this.cL = [];

        this.fun = fun;
        this.arg = null;
    };
    Schedule.RunOnceAsync.prototype = {
        init: function () {
            var t = this;
            t.status = 1;
            t.fun(function () {
                t.arg = arguments;
                t.status = 2;
                for (var i = 0; i < t.cL.length; i++) {
                    t.cL[i].apply(t, t.arg);
                }
            });
        },
        ready: function (callback) {
            var t = this;
            callback = callback || function () {
                };
            if (t.status === 2) {
                callback.apply(t, t.arg);
                return;
            }
            if (t.status === 1) {
                t.cL.push(callback);
                return;
            }
            t.cL.push(callback);
        }
    };

    /**
     * 存储数据
     */
    var Storage = (function () {
        var storage = null;

        return function (callback) {
            callback = callback || function () {
                };
            if (storage) {
                callback(storage);
                return;
            }
            require.async('js/eh_storage', function (s) {
                storage = s;
                callback(storage);
            });
        };
    })();


    var Num = {
        /**
         * 将数字转换成百分数
         * @param num 要转换的数
         * @param 转换率
         */
        percent: function (num, decimal) {
            decimal = decimal || 2;
            return parseInt(num * Math.pow(10, decimal + 2)) / Math.pow(10, decimal) + '%';
        },

        percentage: function (dividend, divisor, decimal) {
            var t = this;
            decimal = decimal || 2;

            if (divisor == 0) {
                return 'x/0';
            } else {
                var num = dividend / divisor;
                return (t.percent(num, decimal));
            }

        }

    };


    /**
     * 进度条显示，基于Amaze UI
     */
    var Progress = (function () {
        /**
         * NProgress (c) 2013, Rico Sta. Cruz
         * @via http://ricostacruz.com/nprogress
         */

        var NProgress = {};
        var $html = $('html');

        NProgress.version = '0.1.6';

        var Settings = NProgress.settings = {
            minimum: 0.08,
            easing: 'ease',
            positionUsing: '',
            speed: 200,
            trickle: true,
            trickleRate: 0.02,
            trickleSpeed: 800,
            showSpinner: true,
            parent: 'body',
            barSelector: '[role="nprogress-bar"]',
            spinnerSelector: '[role="nprogress-spinner"]',
            template: '<div class="nprogress-bar" role="nprogress-bar">' +
            '<div class="nprogress-peg"></div></div>' +
            '<div class="nprogress-spinner" role="nprogress-spinner">' +
            '<div class="nprogress-spinner-icon"></div></div>'
        };

        /**
         * Updates configuration.
         *
         *     NProgress.configure({
   *       minimum: 0.1
   *     });
         */
        NProgress.configure = function (options) {
            var key, value;
            for (key in options) {
                value = options[key];
                if (value !== undefined && options.hasOwnProperty(key)) Settings[key] = value;
            }

            return this;
        };

        /**
         * Last number.
         */

        NProgress.status = null;

        /**
         * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
         *
         *     NProgress.set(0.4);
         *     NProgress.set(1.0);
         */

        NProgress.set = function (n) {
            var started = NProgress.isStarted();

            n = clamp(n, Settings.minimum, 1);
            NProgress.status = (n === 1 ? null : n);

            var progress = NProgress.render(!started),
                bar = progress.querySelector(Settings.barSelector),
                speed = Settings.speed,
                ease = Settings.easing;

            progress.offsetWidth;
            /* Repaint */

            queue(function (next) {
                // Set positionUsing if it hasn't already been set
                if (Settings.positionUsing === '') Settings.positionUsing = NProgress.getPositioningCSS();

                // Add transition
                css(bar, barPositionCSS(n, speed, ease));

                if (n === 1) {
                    // Fade out
                    css(progress, {
                        transition: 'none',
                        opacity: 1
                    });
                    progress.offsetWidth;
                    /* Repaint */

                    setTimeout(function () {
                        css(progress, {
                            transition: 'all ' + speed + 'ms linear',
                            opacity: 0
                        });
                        setTimeout(function () {
                            NProgress.remove();
                            next();
                        }, speed);
                    }, speed);
                } else {
                    setTimeout(next, speed);
                }
            });

            return this;
        };

        NProgress.isStarted = function () {
            return typeof NProgress.status === 'number';
        };

        /**
         * Shows the progress bar.
         * This is the same as setting the status to 0%, except that it doesn't go backwards.
         *
         *     NProgress.start();
         *
         */
        NProgress.start = function () {
            if (!NProgress.status) NProgress.set(0);

            var work = function () {
                setTimeout(function () {
                    if (!NProgress.status) return;
                    NProgress.trickle();
                    work();
                }, Settings.trickleSpeed);
            };

            if (Settings.trickle) work();

            return this;
        };

        /**
         * Hides the progress bar.
         * This is the *sort of* the same as setting the status to 100%, with the
         * difference being `done()` makes some placebo effect of some realistic motion.
         *
         *     NProgress.done();
         *
         * If `true` is passed, it will show the progress bar even if its hidden.
         *
         *     NProgress.done(true);
         */

        NProgress.done = function (force) {
            if (!force && !NProgress.status) return this;

            return NProgress.inc(0.3 + 0.5 * Math.random()).set(1);
        };

        /**
         * Increments by a random amount.
         */

        NProgress.inc = function (amount) {
            var n = NProgress.status;

            if (!n) {
                return NProgress.start();
            } else {
                if (typeof amount !== 'number') {
                    amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
                }

                n = clamp(n + amount, 0, 0.994);
                return NProgress.set(n);
            }
        };

        NProgress.trickle = function () {
            return NProgress.inc(Math.random() * Settings.trickleRate);
        };

        /**
         * (Internal) renders the progress bar markup based on the `template`
         * setting.
         */

        NProgress.render = function (fromStart) {
            if (NProgress.isRendered()) return document.getElementById('nprogress');

            $html.addClass('nprogress-busy');

            var progress = document.createElement('div');
            progress.id = 'nprogress';
            progress.innerHTML = Settings.template;

            var bar = progress.querySelector(Settings.barSelector),
                perc = fromStart ? '-100' : toBarPerc(NProgress.status || 0),
                parent = document.querySelector(Settings.parent),
                spinner;

            css(bar, {
                transition: 'all 0 linear',
                transform: 'translate3d(' + perc + '%,0,0)'
            });

            if (!Settings.showSpinner) {
                spinner = progress.querySelector(Settings.spinnerSelector);
                spinner && $(spinner).remove();
            }

            if (parent != document.body) {
                $(parent).addClass('nprogress-custom-parent');
            }

            parent.appendChild(progress);
            return progress;
        };

        /**
         * Removes the element. Opposite of render().
         */

        NProgress.remove = function () {
            $html.removeClass('nprogress-busy');
            $(Settings.parent).removeClass('nprogress-custom-parent');

            var progress = document.getElementById('nprogress');
            progress && $(progress).remove();
        };

        /**
         * Checks if the progress bar is rendered.
         */

        NProgress.isRendered = function () {
            return !!document.getElementById('nprogress');
        };

        /**
         * Determine which positioning CSS rule to use.
         */

        NProgress.getPositioningCSS = function () {
            // Sniff on document.body.style
            var bodyStyle = document.body.style;

            // Sniff prefixes
            var vendorPrefix = ('WebkitTransform' in bodyStyle) ? 'Webkit' :
                ('MozTransform' in bodyStyle) ? 'Moz' :
                    ('msTransform' in bodyStyle) ? 'ms' :
                        ('OTransform' in bodyStyle) ? 'O' : '';

            if (vendorPrefix + 'Perspective' in bodyStyle) {
                // Modern browsers with 3D support, e.g. Webkit, IE10
                return 'translate3d';
            } else if (vendorPrefix + 'Transform' in bodyStyle) {
                // Browsers without 3D support, e.g. IE9
                return 'translate';
            } else {
                // Browsers without translate() support, e.g. IE7-8
                return 'margin';
            }
        };

        /**
         * Helpers
         */

        function clamp(n, min, max) {
            if (n < min) return min;
            if (n > max) return max;
            return n;
        }

        /**
         * (Internal) converts a percentage (`0..1`) to a bar translateX
         * percentage (`-100%..0%`).
         */

        function toBarPerc(n) {
            return (-1 + n) * 100;
        }


        /**
         * (Internal) returns the correct CSS for changing the bar's
         * position given an n percentage, and speed and ease from Settings
         */

        function barPositionCSS(n, speed, ease) {
            var barCSS;

            if (Settings.positionUsing === 'translate3d') {
                barCSS = {transform: 'translate3d(' + toBarPerc(n) + '%,0,0)'};
            } else if (Settings.positionUsing === 'translate') {
                barCSS = {transform: 'translate(' + toBarPerc(n) + '%,0)'};
            } else {
                barCSS = {'margin-left': toBarPerc(n) + '%'};
            }

            barCSS.transition = 'all ' + speed + 'ms ' + ease;

            return barCSS;
        }


        /**
         * (Internal) Queues a function to be executed.
         */

        var queue = (function () {
            var pending = [];

            function next() {
                var fn = pending.shift();
                if (fn) {
                    fn(next);
                }
            }

            return function (fn) {
                pending.push(fn);
                if (pending.length == 1) next();
            };
        })();


        /**
         * (Internal) Applies css properties to an element, similar to the jQuery
         * css method.
         *
         * While this helper does assist with vendor prefixed property names, it
         * does not perform any manipulation of values prior to setting styles.
         */

        var css = (function () {
            var cssPrefixes = ['Webkit', 'O', 'Moz', 'ms'],
                cssProps = {};

            function camelCase(string) {
                return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function (match, letter) {
                    return letter.toUpperCase();
                });
            }

            function getVendorProp(name) {
                var style = document.body.style;
                if (name in style) return name;

                var i = cssPrefixes.length,
                    capName = name.charAt(0).toUpperCase() + name.slice(1),
                    vendorName;
                while (i--) {
                    vendorName = cssPrefixes[i] + capName;
                    if (vendorName in style) return vendorName;
                }

                return name;
            }

            function getStyleProp(name) {
                name = camelCase(name);
                return cssProps[name] || (cssProps[name] = getVendorProp(name));
            }

            function applyCss(element, prop, value) {
                prop = getStyleProp(prop);
                element.style[prop] = value;
            }

            return function (element, properties) {
                var args = arguments,
                    prop,
                    value;

                if (args.length == 2) {
                    for (prop in properties) {
                        value = properties[prop];
                        if (value !== undefined && properties.hasOwnProperty(prop)) applyCss(element, prop, value);
                    }
                } else {
                    applyCss(element, args[1], args[2]);
                }
            }
        })();

        return NProgress;
    })();

    var Objects = {
        isArray: function (data) {
            return Object.prototype.toString.call(data) === '[object Array]';
        },
        isObject: function (data) {
            return Object.prototype.toString.call(data) === '[object Object]';
        }
    };

    EverHome.JSON = JSON;
    EverHome.Prompt = Prompt;
    EverHome.Confirm = Confirm;
    EverHome.Alert = Alert;
    EverHome.Dialog = Dialog;
    EverHome.Canvas = Canvas;
    EverHome.FullDialog = FullDialog;
    EverHome.LayerPop = LayerPop;
    EverHome.Mask = Mask;
    EverHome.string = string;
    EverHome.Time = Time;
    EverHome.Scroll = Scroll;
    EverHome.getMyInfo = getMyInfo;
    EverHome.Logger = Logger;
    EverHome.RichText = RichText;
    EverHome.DownLoad = DownLoad;
    EverHome.Schedule = Schedule;
    EverHome.Storage = Storage;
    EverHome.ClickLayerPop = ClickLayerPop;
    EverHome.HoverLayerPop = HoverLayerPop;
    EverHome.Num = Num;
    EverHome.Progress = Progress;
    EverHome.Objects = Objects;

    window.EverHome = EverHome;
    window.EH = EverHome;

    return EverHome;

});