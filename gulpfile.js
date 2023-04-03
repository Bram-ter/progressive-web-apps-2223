const gulp = require('gulp');
const concat = require('gulp-concat');
const nodemon = require('gulp-nodemon');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('css', () => (
    gulp.src('./public/css/*.css')
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concat('style.min.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('public/dist'))
))

gulp.task('js', async () => {
    gulp.src('./public/js/*.js')
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/dist'))
})

gulp.task('watch', async () => (
    gulp.watch('./public/css/*.css', gulp.parallel('css')),
    gulp.watch('./public/js/*.js', gulp.parallel('js'))
))

gulp.task('start', (done) => (
    nodemon({
        script: 'server.js',
        ext: 'css',
        tasks: ['css'],
        ignore: ['public/dist'],
        done: done
    })
))

gulp.task('default', gulp.parallel('css', 'js', 'start', 'watch'))