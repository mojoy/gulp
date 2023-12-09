const gulp = require('gulp'); // Подключаем Gulp
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass')(require('sass'));



// Таск для компиляции SCSS в CSS
gulp.task('scss', function(callback) {
	return gulp.src('./app/scss/main.scss')
		.pipe(sass())
		.pipe(gulp.dest('./app/css/'))
		.on('end', callback); // Добавлен вызов callback() при завершении потока
});

// Слежение за HTML и CSS и обновление браузера
gulp.task('watch', function() {
	watch(['./app/*.html', './app/scss/**/*.scss', './app/css/**/*.css'], gulp.parallel( browserSync.reload ));
});

// Задача для старта сервера из папки app
gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: "./app/"
		}
	})
});

// Дефолтный таск (задача по умолчанию)
// Запускаем одновременно задачи server и watch
gulp.task('default', gulp.parallel('server', 'scss', 'watch'));
