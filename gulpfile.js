var config = {
    srcDir: './src',
    sassPattern: 'scss/**/*.scss'
};
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    /*svgSprite = require('gulp-svg-sprite'),
    svgmin = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace'),*/
    concat = require('gulp-concat'), // Склеивание файлов
    cleanCSS = require('gulp-clean-css'); // Минимизация CSS
    //rename = require("gulp-rename"); // Переименование файлов

gulp.task("sass", function() {
    return gulp.src(['node_modules/normalize.css/normalize.css', config.srcDir+'/scss/home.scss', config.srcDir+'/scss/home-responsive.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass().on ('error', sass.logError))
        .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
        .pipe(concat('main.css'))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        //.pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(config.srcDir+'/css'));
});
gulp.task("watch", function() {
    gulp.watch(config.srcDir+'/'+config.sassPattern, ["sass"]);
});
gulp.task('default', ["sass", "watch"]);