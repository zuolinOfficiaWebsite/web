/**
 * Created by liyatang on 2015/3/4.
 */
(function () {
    'use strict';

    var gulp = require('gulp'),
        concat = require('gulp-concat'),
        inject = require('gulp-inject');

    gulp.task('default', [], function () {

    });

    var libBase = 'lib/';
    var insideIndexBase = 'index/';

    var indexBase = 'web/index/';
    var indexLibBase = 'web/lib/';  // 首页迁移到web目录外的base路径

    gulp.task('lib-default', ['lib-combile-js', 'lib-combile-css']);
    gulp.task('lib-combile-js', function () {
        gulp.src([
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/jquery-cookie/jquery.cookie.js',
            'bower_components/jquery-json/dist/jquery.json.min.js',
            'bower_components/jquery-migrate/jquery-migrate.min.js',
            'bower_components/bootstrap/dist/js/bootstrap.min.js',
            'bower_components/seajs/dist/sea.js',
            'bower_components/seajs-css/dist/seajs-css.js'])
            .pipe(concat('c_base.js')).pipe(gulp.dest(libBase + 'js/'));
    });

    gulp.task('lib-combile-css', function () {
        gulp.src([
            'bower_components/bootstrap/dist/css/bootstrap.min.css',
            'bower_components/font-awesome/css/font-awesome.min.css'])
            .pipe(concat('c_base.css')).pipe(gulp.dest(libBase + 'css/'));
    });


    gulp.task('index-build', function () {

        gulp.src(indexBase + 'index.html')
            .pipe(inject(gulp.src([indexBase + 'inject/meta.html']), {
                starttag: '<!-- inject:meta:{{ext}} -->',
                transform: function (filePath, file) {
                    // return file contents as string
                    return file.contents.toString('utf8');
                }
            }))
            .pipe(inject(gulp.src([indexBase + 'inject/header.html']), {
                starttag: '<!-- inject:header:{{ext}} -->',
                transform: function (filePath, file) {
                    // return file contents as string
                    return file.contents.toString('utf8');
                }
            }))
            .pipe(inject(gulp.src([indexBase + 'inject/bottom.html']), {
                starttag: '<!-- inject:bottom:{{ext}} -->',
                transform: function (filePath, file) {
                    // return file contents as string
                    return file.contents.toString('utf8');
                }
            }))
            .pipe(inject(gulp.src([indexBase + 'inject/co_bottom.html']), {
                starttag: '<!-- inject:cobottom:{{ext}} -->',
                transform: function (filePath, file) {
                    // return file contents as string
                    return file.contents.toString('utf8');
                }
            }))
            .pipe(inject(gulp.src([
                indexLibBase + 'css/c_base.css',
                indexLibBase + 'css/eh_global.css',
                indexBase + 'css/*.css',

                indexLibBase + 'js/compatibility.js',
                indexLibBase + 'js/c_base.js',
                indexBase + 'js/seajs_config.js',
                indexBase + 'js/stellar.js',
                indexBase + 'js/wow.min.js',
                indexBase + 'js/home.js',
                indexBase + 'js/index.js'
            ], {read: false}), {
                relative: true
            }))
            .pipe(gulp.dest(indexBase));
    });

    gulp.task('inside-index-build', function () {

        gulp.src(insideIndexBase + '*.html')
            .pipe(inject(gulp.src([insideIndexBase + 'inject/meta.html']), {
                starttag: '<!-- inject:meta:{{ext}} -->',
                transform: function (filePath, file) {
                    // return file contents as string
                    return file.contents.toString('utf8');
                }
            }))
            .pipe(inject(gulp.src([insideIndexBase + 'inject/header.html']), {
                starttag: '<!-- inject:header:{{ext}} -->',
                transform: function (filePath, file) {
                    // return file contents as string
                    return file.contents.toString('utf8');
                }
            }))
            .pipe(inject(gulp.src([insideIndexBase + 'inject/bottom.html']), {
                starttag: '<!-- inject:bottom:{{ext}} -->',
                transform: function (filePath, file) {
                    // return file contents as string
                    return file.contents.toString('utf8');
                }
            }))
            .pipe(inject(gulp.src([insideIndexBase + 'inject/co_bottom.html']), {
                starttag: '<!-- inject:cobottom:{{ext}} -->',
                transform: function (filePath, file) {
                    // return file contents as string
                    return file.contents.toString('utf8');
                }
            }))
            .pipe(inject(gulp.src([
                libBase + 'css/c_base.css',
                libBase + 'css/eh_global.css',
                insideIndexBase + 'css/*.css',

                libBase + 'js/compatibility.js',
                libBase + 'js/c_base.js',
                insideIndexBase + 'js/seajs_config.js',
                insideIndexBase + 'js/stellar.js',
                insideIndexBase + 'js/wow.min.js',
                insideIndexBase + 'js/home.js',
                insideIndexBase + 'js/index.js'
            ], {read: false}), {
                relative: true
            }))
            .pipe(gulp.dest(insideIndexBase));
    });


    //
    //gulp.task('baidu-build', function () {
    //
    //    gulp.src(indexBase + '*.html')
    //        .pipe(inject(gulp.src([libBase + 'inject/baidu.html']), {
    //            starttag: '<!-- inject:baidu:{{ext}} -->',
    //            transform: function (filePath, file) {
    //                // return file contents as string
    //                return file.contents.toString('utf8');
    //            }
    //        }))
    //        .pipe(gulp.dest(indexBase));
    //});
})();