var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});

//for js files
gulp.task('vet', function () {
    return gulp
        .src([
            //any file in 'server' folder and sub folder
            './server/**/*.js',
            //any file in 'public' folder and sub folder
            './public/**/*.js',
            //execlude any file in 'public/vendor' folder and sub folder
            '!./public/vendor/**/*.js',
            '!./server/config/mailer.js',
            '!./server/config/mustache.js',
            //any file in root
            './*.js'
        ])
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});