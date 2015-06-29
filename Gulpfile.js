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
    sourceTS: "Typescript/**/*.ts",
    sourceJS: "Typescript/**/*.js",
    html: "Typescript/**/*.html",
    style: "styles/**/*.css"
};
var tsProject = ts.createProject('tsconfig.json', { typescript: require('typescript') });
//
gulp.task('clean',function(){
    return gulp.src("wwwroot/*")
    .pipe(clean());
});
//
gulp.task('build-ts',function () {
    var tsResult = tsProject.src() // instead of gulp.src(...) 
        .pipe(ts(tsProject));
    return tsResult.js.pipe(gulp.dest('.'));
});
gulp.task("copy-images",function(){
    return gulp.src('./images/**/*',{base:'.'})
    .pipe(gulp.dest('wwwroot'));
});
gulp.task("copy-scripts",function(){
    return gulp.src('./lib/**/*',{base:'.'})
    .pipe(gulp.dest('wwwroot'));
});
gulp.task("copy-styles",function(){
    return gulp.src('./lib/**/*',{base:'.'})
    .pipe(gulp.dest('wwwroot'));
});
gulp.task("copy-js",function(){
    return gulp.src('Typescript/app/**/*.js',{base:'./Typescript/app'})
    .pipe(gulp.dest('wwwroot'));
});
gulp.task("copy-html",function(){
    return gulp.src('./Typescript/app/**/*.html',{base:'./Typescript/app'})
    .pipe(gulp.dest('wwwroot'));
});
gulp.task("build",['clean','build-ts','copy-images','copy-scripts','copy-styles',
    'copy-js','copy-html'],function(){
     return gulp.src('./Typescript/app/**/*.ico',{base:'./Typescript/app'})
    .pipe(gulp.dest('wwwroot'));
});
//
gulp.task('serve',['build'] ,function (done) {
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
/*
function reportChange(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}
gulp.task('watch', ['serve'], function () {
    gulp.watch(path.sourceJS, [browserSync.reload]).on('change', reportChange);
    gulp.watch(path.html, [browserSync.reload]).on('change', reportChange);
    gulp.watch(path.style, [browserSync.reload]).on('change', reportChange);
});
*/
