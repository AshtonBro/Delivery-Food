var gulp = require('gulp');
var bs = require('browser-sync');
var sass = require('gulp-sass');
var gutil = require( 'gulp-util' );
var autoprefixer = require('gulp-autoprefixer');

// Запускаем сервер, предварительно скопилировав SASS
gulp.task('serve', ['sass'], () => {

    bs.init({
        server: "./src"
    });

    gulp.watch("src/sass/*.sass", ['sass']);
    gulp.watch("src/*.html").on('change', bs.reload);
});

// Делаем компиляцию SASS в CSS 
gulp.task('sass', () => {
    return gulp.src("src/sass/*.sass")
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("src/css"))
        .pipe(bs.stream());
});

gulp.task('default', ['serve']);

