var gulp = require('gulp'),
    babel = require('gulp-babel'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload');
    concat = require('gulp-concat'),
    minifycss = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass'),
    cached = require('gulp-cached'),
    remember = require('gulp-remember'),
    stripDebug = require('gulp-strip-debug');

// Compile sass task
gulp.task('sass', function() {
    return gulp.src('public/src/css/**/*.scss')
              .pipe(sass({
                    includePaths: ['public/src/css']
              }).on('error', sass.logError))
              .pipe(minifycss())
              .pipe(gulp.dest('public/dist/css'));
});

gulp.task('strip', function () {
    return gulp.src('dist/**/*.js')
    .pipe(stripDebug())
    .pipe(gulp.dest('dist'));
});

// ES6 to ES5
gulp.task('babel', function() {
    return gulp.src('public/src/js/**/*.js')
    // .pipe(plumber())
    .pipe(cached())
    .pipe(babel({
        'presets': ['es2015', 'stage-0'],
        'plugins': ['transform-es2015-modules-amd']
    }))
    .pipe(remember())
    // .pipe(livereload())
    .pipe(gulp.dest('public/dist/js'));
});

// Watch task
gulp.task('watch', function() {
    // livereload
    // livereload.listen();

    // Watch .scss files change
    gulp.watch('public/src/**/*.scss', ['sass']);

    // Watch .js files change
    gulp.watch('public/src/**/*.js', ['babel']);

    // Watch .tpl files change
    gulp.watch('public/src/**/*.tpl', ['tpl']);

});

// Default task
gulp.task('default', function() {
    gulp.start('watch');
});
