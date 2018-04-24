(function () {
    'use strict';

    var gulp = require('gulp');
    var ngTemplates = require('gulp-ng-templates');
    var ngAnnotate = require('gulp-ng-annotate');
    var uglify = require('gulp-uglify');
    var uglifycss = require('gulp-uglifycss');
    var concat = require('gulp-concat');
    var sequence = require('gulp-sequence');
    var del = require('del');
    var rename = require('gulp-rename');

    var inject = require('gulp-inject');

    // 因为生产出来的对这个moduleName 就有依赖性。故会覆盖之前的module。 所以不能用ng.zl。
    var moduleName = 'ng.zl.templates';

    gulp.task('default', ['release', 'demo'], function () {

    });

    gulp.task('release', function (cb) {
        sequence('clean.before', ['annotate', 'templates'], 'concat', 'copy.compatibility', 'uglify', 'copy.css', 'uglifycss', 'clean.after', cb);
    });

    gulp.task('clean.before', function () {
        del(['dist/*.js', 'dist/js', 'dist/*.css', 'dist/iconfont.*']);
    });

    gulp.task('annotate', function () {
        return gulp.src(['js/*.js','js/**/*.js'])
            .pipe(ngAnnotate())
            .pipe(gulp.dest('dist/js'));
    });

    gulp.task('templates', function () {
        return gulp.src('views/*.html')
            .pipe(ngTemplates({
                module: moduleName,
                path: function (path, base) {
                    return path.replace(base, 'views\\');
                }
            }))
            .pipe(gulp.dest('dist/js'));
    });

    gulp.task('concat', function () {
        return gulp.src(['dist/js/module.js', 'dist/js/module.pick.js', 'dist/js/**/*.js' ])
            .pipe(concat('ng.zl.js'))
            .pipe(gulp.dest('dist'));

    });

    gulp.task('copy.compatibility', function () {
        return gulp.src(['dist/js/compatibility.js'])
            .pipe(gulp.dest('dist'));
    });

    gulp.task('uglify', function () {
        return gulp.src('dist/*.js')
            .pipe(uglify())
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest('dist'));
    });

    gulp.task('copy.css', function () {
        return gulp.src(['css/*.css', 'css/*.eot', 'css/*.svg', 'css/*.ttf', 'css/*.woff'])
            .pipe(gulp.dest('dist'));
    });

    gulp.task('uglifycss', function () {
        return gulp.src('dist/*.css')
            .pipe(uglifycss())
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest('dist'));
    });

    gulp.task('clean.after', function () {
        del(['dist/js']);
    });

    gulp.task('demo', ['demo-templates', 'demo-templates-watch'], function () {
        var target = gulp.src('demo/index.html');
        var sources = gulp.src([
            'bower_components/fontawesome/css/font-awesome.css',
            'bower_components/angular-material/angular-material.css',
            'bower_components/bootstrap/dist/css/bootstrap.css',

            'css/*.css',

            'bower_components/jquery/dist/jquery.js',
            'bower_components/underscore/underscore-min.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-sanitize/angular-sanitize.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-aria/angular-aria.js',
            'bower_components/angular-material/angular-material.js',
            'bower_components/FileSaver/FileSaver.min.js',

            'js/compatibility.js',
            'js/common/uploadifive/jquery.uploadifive.min.js',

            'js/*.js',
            'js/directives/*.js',
            'js/filters/*.js',
            'js/services/*.js',
            'js/controllers/*.js',

            'demo/templates.min.js',

            'demo/app.js',
            'demo/index.js'
        ], {read: false});

        return target.pipe(inject(sources, {relative: true})).pipe(gulp.dest('demo'));
    });

    gulp.task('demo-templates', function () {
        return gulp.src('views/*.html')
            .pipe(ngTemplates({
                module: moduleName,
                path: function (path, base) {
                    return path.replace(base, 'views\\');
                }
            }))
            .pipe(gulp.dest('demo'));
    });

    gulp.task('demo-templates-watch', function () {
        return gulp.watch('views/*.html', ['demo-templates']);
    });

})();