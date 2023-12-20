export const videos = () => {
    return app.gulp.src(app.path.src.videos)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "videos",
                message: "Error: <%=error.message %>"
            })
        ))
        .pipe(app.gulp.dest(app.path.build.videos))
        .pipe(app.plugins.browsersync.stream());
  };