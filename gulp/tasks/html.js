import fileinclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg"; //оборачивает изображение в тег пикчерс и добавляет сорс с путем на вебр картинку такую же, какая была пропсана в срц
import versionNumber from "gulp-version-number"; //добавляет к файлам стилей и джейс версию

export const html = () => {
	return app.gulp.src(app.path.src.html)
	.pipe(app.plugins.plumber(
		app.plugins.notify.onError({
			title: "HTML",
			message: "Error: <%=error.message %>"
		})
	))
	.pipe(fileinclude({
		prefix: '@@',
		basepath: '@file'
	}))
	.pipe(app.plugins.replace(/@img\//g, 'img/'))
	.pipe(
		app.plugins.if(
			app.isBuild, // режип продакшена, то работаем
			webpHtmlNosvg(),
		)
	)
	.pipe(
		versionNumber({
			'value' : '%MDS%',
			'append' : {
				'key' : '_v',
				'cover' : 0,
				'to' : [
					'css',
					'js',
				]
			},
			'output' : {
				'file' : 'version.json'
			}
		})
	)
	.pipe(app.gulp.dest(app.path.build.html))
	.pipe(app.plugins.browsersync.stream());
};