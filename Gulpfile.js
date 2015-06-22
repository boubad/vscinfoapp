var gulp = require('gulp');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var del = require('del');
var ts = require('gulp-typescript');
var merge = require('merge2');
//
gulp.task('build-ts', function () {
    var tsResult = gulp.src([
        './public/views/**/*.ts',
        './typings/**/*.d.ts'
        ],
        {base: "."})
    .pipe(ts({
         typescript: require('typescript'),
         declarationFiles: false,
         noExternalResolve: true,
         target: "es5",
         module: "amd",
         sourceMap: true,
         emitDecoratorMetadata: true,
         experimentalDecorators: true
    }));

    return merge([
        tsResult.dts.pipe(gulp.dest('.')),
        tsResult.js.pipe(gulp.dest('.')),
    ]);
});
//
gulp.task('clean-dist', function(cb) {
  del(['dist'], cb);
});
gulp.task('dist',['clean-dist'], function() {
  return gulp.src(['./public/**/*.js',
         './public/scripts/**/*.*','public/styles/**/*.*',
         './public/**/*.html','./public/**/*.ico','./public/images/**/*.*',
         './public/.htaccess','./public/site.manifest'], {
      base: './public'
    })
    .pipe(gulp.dest('dist'));
});
//
var path = {
  sourceTS: "public/views/**/*.ts",
  sourceJS: "public/views/**/*.js",
  html: "public/views/**/*.html",
  style: "public/styles/**/*.css",
  manifest: "public/*.manifest"
}

gulp.task('serve', function(done) {
  browserSync({
    open: false,
    port: 9000,
    server: {
      baseDir: ['./public'],
      middleware: function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);
});

function reportChange(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

gulp.task('watch', ['serve'], function() {
  gulp.watch(path.sourceJS, [browserSync.reload]).on('change', reportChange);
  gulp.watch(path.html, [browserSync.reload]).on('change', reportChange);
  gulp.watch(path.style, [browserSync.reload]).on('change', reportChange);
  gulp.watch(path.manifest, [browserSync.reload]).on('change', reportChange);
});
