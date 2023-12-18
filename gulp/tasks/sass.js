import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";

import cleanCss from "gulp-clean-css"; //сжатие цсс файлов
import webpcss from "gulp-webpcss"; //вывод вебп изображений
import autoprefixer from "gulp-autoprefixer"; //добавление префиксов
import groupCssMediaQueries from "gulp-group-css-media-queries"; //группировка медиазапросов


const sass = gulpSass(dartSass);

export const scss = () => {
	return app.gulp.src(app.path.src.scss, { sourcemap: app.isDev })  // еслив режиме разработчика, то будем строить карту стилей, если в продакшее, то не будет карты
	.pipe(app.plugins.plumber(
		app.plugins.notify.onError({
			title: "scss",
			message: "Error: <%=error.message %>"
		})
	))
	.pipe(app.plugins.replace(/@img\//g, '../img/'))
	.pipe(sass({
		outputStyle: 'compressed'
	}))
	.pipe(
		app.plugins.if(    // через условие проверяем, если в режиме разработке, то не тратим время на это
			app.isBuild,
			groupCssMediaQueries()
		)
	)
	/*.pipe(webpcss(
		{
			webpClass: ".webp",
			noWebpClass: ".no-webp"
		}
	))*/
	.pipe(
		app.plugins.if(    // через условие проверяем, если в режиме разработке, то не тратим время на это
			app.isBuild,
			autoprefixer({
				grid: true,
				overrideBrowserslist: ["last 4 versions"],
				cascade: true
			}
		)
	))
	//не сжатые стили на всякий случай
	.pipe(app.gulp.dest(app.path.build.css))
	.pipe(cleanCss())
	.pipe(rename({
		extname: '.min.css'
	}))

	.pipe(app.gulp.dest(app.path.build.css))
	.pipe(app.plugins.browsersync.stream());
};