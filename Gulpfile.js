var gulp = require('gulp');
var clean = require('gulp-clean');
//var concat = require('gulp-concat');
//var jshint = require('gulp-jshint');
//var uglify = require('gulp-uglify');
//var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var ts = require('gulp-typescript');
//var del = require('del');
//
var path = {
    sourceTS: "Typescript/src/**/*.ts",
    sourceJS: "wwwroot/**/*.js",
    html: "wwwroot/**/*.html",
    style: "wwwroot/**/*.css"
};
var tsProject = ts.createProject('tsconfig.json', { typescript: require('typescript') });
//
gulp.task('clean', function () {
    return gulp.src("wwwroot/*")
        .pipe(clean());
});
gulp.task('clean-temp', function () {
    return gulp.src("./temp/*")
        .pipe(clean());
});
//
gulp.task('build-ts',['clean-temp'], function () {
    var tsResult = tsProject.src() // instead of gulp.src(...) 
        .pipe(ts(tsProject));
    return tsResult.js.pipe(gulp.dest('./temp'));
});
gulp.task("build",['build-ts'], function () {
    gulp.src('./temp/Typescript/src/**/*', { base: './temp/Typescript/src' })
        .pipe(gulp.dest('./wwwroot'));
});
gulp.task("copy-images", function () {
    return gulp.src('./images/**/*', { base: '.' })
        .pipe(gulp.dest('wwwroot'));
});
gulp.task("copy-scripts", function () {
    return gulp.src('./lib/**/*', { base: '.' })
        .pipe(gulp.dest('wwwroot'));
});
gulp.task("copy-styles", function () {
    return gulp.src('./styles/**/*', { base: '.' })
        .pipe(gulp.dest('wwwroot'));
});
gulp.task("copy-html", function () {
    return gulp.src('./Typescript/src/**/*.html', { base: './Typescript/src' })
        .pipe(gulp.dest('wwwroot'));
});
gulp.task("copy-files", ['copy-images', 'copy-scripts', 'copy-styles', 'copy-html'], function () {
    return gulp.src('./Typescript/src/**/*.ico', { base: './Typescript/src' })
        .pipe(gulp.dest('wwwroot'));
});
gulp.task("all", ['build-ts', 'copy-files'], function () {
    return gulp.src('./Typescript/src/**/*.ico', { base: './Typescript/src' })
        .pipe(gulp.dest('wwwroot'));
});
//
gulp.task('serve', ['all'], function (done) {
    browserSync({
        open: false,
        port: 9000,
        server: {
            baseDir: ['./wwwroot'],
            middleware: function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            }
        }
    }, done);
});
//
function reportChange(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}
gulp.task('watch', ['serve'], function () {
    gulp.watch(path.sourceJS, [browserSync.reload]).on('change', reportChange);
    gulp.watch(path.html, [browserSync.reload]).on('change', reportChange);
    gulp.watch(path.style, [browserSync.reload]).on('change', reportChange);
});
