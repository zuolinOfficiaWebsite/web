/**
 * Created by liyatang on 2015/5/5.
 */
//(function () {
//    'use strict';
//    var gulp = require('gulp'),
//        inject = require('gulp-inject'),
//        concat = require('gulp-concat');
//
//    gulp.task('default', ['build'], function () {
//        // place code for your default task here
//    });
//
//    gulp.task('build', function () {
//        var target = gulp.src('index.html');
//        var sources = gulp.src([
//            'bower_components/fontawesome/css/font-awesome.min.css',
//            'bower_components/angular-material/angular-material.css',
//            'bower_components/bootstrap/dist/css/bootstrap.min.css',
//            'bower_components/jquery-ui/themes/smoothness/jquery-ui.min.css',
//
//            'bower_components/ng.zl/dist/ng.zl.min.css',
//
//            'css/*.css',
//
//            'bower_components/jquery/dist/jquery.min.js',
//            'bower_components/jquery-ui/jquery-ui.js',
//            'bower_components/underscore/underscore-min.js',
//            'bower_components/angular/angular.js',
//            'bower_components/angular-sanitize/angular-sanitize.min.js',
//            'bower_components/angular-ui-router/release/angular-ui-router.min.js',
//            'bower_components/angular-ui-date/src/date.js',
//            'bower_components/angular-bootstrap/ui-bootstrap.min.js',
//            'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
//            'bower_components/angular-animate/angular-animate.min.js',
//            'bower_components/angular-aria/angular-aria.min.js',
//            'bower_components/angular-material/angular-material.min.js',
//            'bower_components/angular-cookies/angular-cookies.js',
//            'bower_components/angularLocalStorage/src/angularLocalStorage.js',
//            'bower_components/zeroclipboard/dist/zeroclipboard.min.js',
//            'bower_components/angular-zeroclipboard/src/angular-zeroclipboard.js',
//            'js/common/uploadifive/jquery.uploadifive.min.js',
//
//            'bower_components/ng.zl/dist/ng.zl.min.js',
//            'bower_components/ng.zl/dist/compatibility.min.js',
//
//            'js/app.js',
//            'js/directives/*.js',
//            'js/filters/*.js',
//            'js/services/*.js',
//            'js/controllers/*.js'
//        ], {read: false});
//
//        return target.pipe(inject(sources, {relative: true})).pipe(gulp.dest(''));
//    });
//})();
'use strict';
const gulp = require('gulp');

// 引入组件

const concat = require('gulp-concat');
const rename = require('gulp-rename');
const mincss = require('gulp-cssnano');
const htmlmin = require('gulp-htmlmin');
const replace = require('gulp-replace');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const autoprefix = require('gulp-autoprefixer');
const notify = require("gulp-notify");

const inject = require('gulp-inject');

const fs = require('fs');

const filesList = ['index', 'tech', 'village', 'park', 'meet', 'shop', 'aclink', 'chucneng','contact_us','download','logo','officeBuilding','wuye'];

gulp.task('images', function () {
    filesList.forEach(function (currentValue, index, array) {
        gulp.src('images/' + currentValue + '/*')
            .pipe(imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()]
            }))
            .pipe(gulp.dest('build/images/' + currentValue));
    });
});


gulp.task('styles', function () {

    filesList.map(function (currentValue, index, array) {
            return ['styles/common.css', 'styles/' + currentValue + '.css'];
        })
        .forEach(function (currentValue, index, array) {
            gulp.src(currentValue)
                .pipe(concat(filesList[index] + '.min.css'))
                .pipe(mincss({'zindex': false, safe: true}))
                .pipe(autoprefix({
                    browsers: ['> 1% in CN', 'last 2 versions']
                }))
                .pipe(gulp.dest('build/styles/'));
                //.pipe(notify(filesList[index] + ".css is done..."));
        });
});

gulp.task('htmls', ['inject'], function () {
    filesList.forEach(function (currentValue, index, array) {
        return gulp.src(currentValue + '.html')
            .pipe(htmlmin({
                collapseWhitespace: true,
                removeComments: true
            }))
            .pipe(replace(currentValue + '.css', currentValue + '.min.css'))
            .pipe(replace('<link rel="stylesheet" href="styles/common.css">', ''))
            .pipe(replace('bower_components', '../bower_components'))
            .pipe(gulp.dest('build'));
            //.pipe(notify(currentValue + ".html is done..."));
    });
});

gulp.task('inject', function () {
    return gulp.src('*.html')
        .pipe(inject(gulp.src(['inject/head.html']), {
            starttag: '<!-- inject:head:{{ext}} -->',
            transform: function (filePath, file) {
                // return file contents as string
                return file.contents.toString('utf8');
            }
        }))
        .pipe(inject(gulp.src(['inject/foot.html']), {
            starttag: '<!-- inject:foot:{{ext}} -->',
            transform: function (filePath, file) {
                // return file contents as string
                return file.contents.toString('utf8');
            }
        }))
        .pipe(inject(gulp.src(['inject/menu.js']), {
            starttag: '/** inject:menu:js **/',
            endtag: '/** endinject **/',
            transform: function (filePath, file) {
                return file.contents.toString('utf8');
            }
        }))
        .pipe(gulp.dest('./'));

});


gulp.task('build', ['images', 'styles', 'htmls'], function () {
    console.log('build done！');
});

gulp.task('default', ['build']);
