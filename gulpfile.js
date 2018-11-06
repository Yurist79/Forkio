 "use strict"

var gulp = require('gulp')
var sass = require('gulp-sass')
var browserSync = require('browser-sync').create()
var clean = require('gulp-clean')
var autoprefixer = require('gulp-autoprefixer')
var concat = require('gulp-concat')
var minify = require('gulp-terser')
var csso = require('gulp-csso')
var pump = require('pump')
var sourceMap = require ('gulp-sourcemaps')
var imagemin = require('gulp-imagemin')
var runSequence = require('run-sequence')

gulp.task('clean', function () {
    return gulp.src('./dist', {read:false})
        .pipe(clean())
})

gulp.task('css', function (cb) {
    pump([
        gulp.src('./src/scss/**/*.scss'),
        sourceMap.init(),
        sass(),
        autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }),
        concat('styles.min.css'),
        csso(),
        sourceMap.write(),
        gulp.dest('./dist')
        ],cb)
})

gulp.task('scripts', function (cb) {
    pump([
        gulp.src('./src/js/**/*.js'),
        concat('script.min.js'),
        minify(),
        gulp.dest('./dist')
    ],cb)
})

gulp.task('img', function(cb){
    pump([
        gulp.src('./src/img/**/*'),
        imagemin({
                interlaced: true,
                progressive: true,
                svgoPlugins: [{removeViewBox:false}],
            }),

        gulp.dest('./dist/img')
        ],cb)
})

gulp.task('dev', function () {
    browserSync.init({
        server:'./'
    })
    gulp.watch('./src/scss/**/*.scss',['css']).on('change', browserSync.reload);
    gulp.watch('./src/js/**/*.js',['scripts']).on('change', browserSync.reload);

})

gulp.task('build', function (cb) {
    runSequence('clean',['css','scripts','img'],cb)
})
gulp.task('default',['build'])




