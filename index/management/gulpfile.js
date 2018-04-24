/**
 * Created by liyatang on 2015/5/5.
 */
(function () {
    'use strict';
    var gulp = require('gulp'),
        inject = require('gulp-inject'),
        concat = require('gulp-concat');

    gulp.task('default', ['build'], function () {
        // place code for your default task here
    });

    gulp.task('build', function () {
        var target = gulp.src('index.html');
        var sources = gulp.src([
            'bower_components/fontawesome/css/font-awesome.min.css',
            'bower_components/angular-material/angular-material.css',
            'bower_components/bootstrap/dist/css/bootstrap.min.css',
            'bower_components/jquery-ui/themes/smoothness/jquery-ui.min.css',

            'bower_components/ng.zl/dist/ng.zl.min.css',

            'css/*.css',

            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/jquery-ui/jquery-ui.js',
            'bower_components/underscore/underscore-min.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-sanitize/angular-sanitize.min.js',
            'bower_components/angular-ui-router/release/angular-ui-router.min.js',
            'bower_components/angular-ui-date/src/date.js',
            'bower_components/angular-bootstrap/ui-bootstrap.min.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'bower_components/angular-animate/angular-animate.min.js',
            'bower_components/angular-aria/angular-aria.min.js',
            'bower_components/angular-material/angular-material.min.js',
            'bower_components/angular-cookies/angular-cookies.js',
            'bower_components/angularLocalStorage/src/angularLocalStorage.js',
            'bower_components/zeroclipboard/dist/ZeroClipboard.min.js',
            'bower_components/angular-zeroclipboard/src/angular-zeroclipboard.js',
            'js/common/uploadifive/jquery.uploadifive.min.js',

            'bower_components/ng.zl/dist/ng.zl.min.js',
            'bower_components/ng.zl/dist/compatibility.min.js/FileSaver.min.js',
            'bower_components/FileSaver.js/FileSaver.min.js',
            'bower_components/angular-kindeditor/kindeditor/kindeditor-all-min.js',
            'bower_components/angular-kindeditor/build/angular-kindeditor.js',

            'js/app.js',
            'js/directives/*.js',
            'js/filters/*.js',
            'js/services/*.js',
            'js/controllers/*.js'
        ], {read: false});

        return target.pipe(inject(sources, {relative: true})).pipe(gulp.dest(''));
    });
})();
