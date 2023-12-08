const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));

// Задача для компиляции Sass в CSS
gulp.task('sass', function() {
  return gulp.src('./app/sass/main.sass')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))  // добавлен outputStyle для управления стилем вывода
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.stream());
});

// Задача для отслеживания изменений в файлах
gulp.task('watch', function() {
  // Отслеживание изменений в HTML файлах
  gulp.watch('./app/*.html').on('change', browserSync.reload);

  // Отслеживание изменений в Sass файлах
  gulp.watch('./app/sass/**/*.sass', gulp.series('sass'));

  // Отслеживание изменений в CSS файлах
  gulp.watch('./app/css/*.css').on('change', browserSync.reload);
});

// Задача для старта сервера из папки app
gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: "./app/"
    },
    port: 3550
  });
});

// Задача по умолчанию, запускает сервер и отслеживание изменений
gulp.task('default', gulp.series('sass', 'server', 'watch'));