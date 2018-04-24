define(function (require, exports, module) {
    'use strict';
    var T = require('tpl/build/eh_news');
    var $ = window.$;
    var EH = require('lib/js/everhome.js');
    var first = true;
    var M = function (container, hash) {
        this.$container = $(container);
        this.$dom = null;
        this.hash = hash;
        this.pageSize = 10;
        this.config = null;
        //this.pageAll = null;
        this.pageIndex = 0;
        this.topicId = hash.b;
    };
    M.prototype = {
        init: function () {
            var t = this;

            t.getData(function (config) {
                t.config = config;
                //t.pageAll = Math.ceil(config.length / t.pageSize);
                t.render();
            });
        },
        render: function () {
            var t = this;

            t.$dom = $(T({
                type: 'main'
            }));
            t.$container.html(t.$dom);
            t.renderList();
            t.bindEvent();
        },
        renderList: function () {
            var t = this;

            if (!t.hash.a) {
                t.$container.find('.content_container').html(T({
                    data: t.config,
                    type: 'abstract'
                }));
                t.$dom.find('.content_container_body').show();

                //t.$dom.find('.content_container_body').hide().slice(0, t.pageSize).show();
                if (t.hash.position && first) {
                    first = false;
                    var goOffset = t.$container.find('.content_container li').eq(t.hash.position).offset();
                    setTimeout(function () {
                        document.body.scrollTop = goOffset.top - 100;
                    }, 500);
                }
            } else if (t.hash.a === 'detail') {
                t.$dom = $(T({
                    data: t.config,
                    type: 'detail',
                    topicId: 0
                }));
                t.$container.html(t.$dom);
                $('#newsContent').html(t.config[0].detail[0].txt); // 不加这个会显示html字符串
            }
        },
        bindEvent: function () {
            var t = this;
            t.$dom.on('click', '.page_button', function () {
                t.pageIndex = t.pageIndex + 1;
                //t.$dom.find('.content_container_body').slice(0, t.pageSize * t.pageIndex).show();
                //if (!t.nextPageAnchor) {
                //    t.$container.find('.eh_bbs_post_page').hide();
                //}
                t.getData(function (config) {
                    t.config = t.config.concat(config);
                    //t.pageAll = Math.ceil(config.length / t.pageSize);
                    t.render();
                });
            });
        },
        getData: function (callback) {
            //var Config = require("html/breaking_news/breaking_news_config");
            //callback && callback(Config);
            var t = this;
            //if(!t.pageIndex && t.pageIndex !== 0) {
            //    t.$container.find('.eh_bbs_post_page').hide();
            //    return;
            //}
            var url, params;
            if(!t.hash.a) {
                url = '/corp/news/listNews';
                params = {
                    status: 0,
                    pageSize: t.pageSize
                };
                if(t.pageIndex > 0 && t.nextPageAnchor) {
                    params.pageAnchor = t.nextPageAnchor;
                }
            } else {
                url = '/corp/news/getNew';
                params = {
                    id: t.hash.b
                };
            }

            $.ajax({
                url: url,
                method: "post",
                data: params,
                success: function (_newsData) {
                    var newsData = _newsData;
                    if(typeof _newsData === "string") {
                        newsData = EH.JSON.str2json(_newsData);
                    }
                    var data = newsData.response.news || [newsData.response];
                    var newObj;
                    var date;

                    var Config = [];
                    for (var i = 0; i < data.length; i++) {
                        newObj = {};
                        date = new Date(data[i].createTime + 8 * 60 * 60 * 1000).toISOString(); // 这里加8小时，从GMT到ISO
                        newObj.title = data[i].title;
                        newObj.time = date.substr(0, 10);
                        newObj.createTime = data[i].createTime;
                        newObj.from = "";
                        newObj.img = "";
                        newObj.abstract = data[i].newsAbstract;
                        newObj.url = data[i].sourceUri;
                        newObj.from = data[i].sourceText;
                        newObj.id = data[i].id;
                        data[i].imageUri && (newObj.img = '/' + data[i].imageUri);
                        newObj.detail = [{
                            txt: data[i].content
                        }];
                        Config.push(newObj);
                    }
                    //Config.sort(function(a, b) {
                    //    return b.createTime - a.createTime;
                    //});
                    t.pageIndex = newsData.response.nextPageAnchor;
                    callback && callback(Config);
                    //if(!('nextPageAnchor' in newsData.response)) {
                    //    t.$container.find('.eh_bbs_post_page').hide();
                    //}
                    if('nextPageAnchor' in newsData.response) {
                        t.nextPageAnchor = newsData.response['nextPageAnchor'];
                    } else {
                        t.$container.find('.eh_bbs_post_page').hide();
                        t.nextPageAnchor = null;
                    }

                }
            });
        }
    };

    return M;

});