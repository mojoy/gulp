import webp from "gulp-webp";
import imagemin from "gulp-imagemin";

export const images = () => {
	return app.gulp.src(app.path.src.images)
	.pipe(app.plugins.plumber(
		app.plugins.notify.onError({
			title: "images",
			message: "Error: <%=error.message %>"
		})
	))
    .pipe(app.plugins.newer(app.path.build.images)) // вызываем never и проверяем изображения в папке с результатом
    .pipe(
        app.plugins.if(    // через условие проверяем, если в режиме разработке, то не тратим время на конвертацию в webp формат
			app.isBuild,
            webp()
        )
    )
    .pipe(
        app.plugins.if(
			app.isBuild,
            app.gulp.dest(app.path.build.images)
        )
    )
    .pipe(
        app.plugins.if(
			app.isBuild,
            app.gulp.src(app.path.src.images)
        )
    )
    .pipe(
        app.plugins.if(
			app.isBuild,
            app.plugins.newer(app.path.build.images)
        )
    )
    .pipe(
        app.plugins.if(
			app.isBuild,
            imagemin ({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 4
        })
    ))
	.pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.svg))
    .pipe(app.gulp.dest(app.path.build.images))
	.pipe(app.plugins.browsersync.stream());
};