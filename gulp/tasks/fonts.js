import { log } from "console";
import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff from "gulp-ttf2woff";
import ttf2woff2 from "gulp-ttf2woff2";
import fontfacegen from "gulp-fontfacegen";

export const otfToTtf = () => (
  app.gulp
    .src(`${app.path.srcFolder}/fonts/*.otf`)
    .pipe(app.plugins.plumber(app.plugins.notify.onError({
      title: "fonts",
      message: "Error: <%=error.message %>",
    })))
    .pipe(fonter({ formats: ["ttf"] }))
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
);

const convertTtfTo = (format) => () => (
  app.gulp
    .src(`${app.path.srcFolder}/fonts/*.ttf`)
    .pipe(app.plugins.plumber(app.plugins.notify.onError({
      title: "fonts",
      message: "Error: <%=error.message %>",
    })))
    .pipe(fonter({ formats: [format] }))
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
    .pipe(format === "woff" ? ttf2woff() : ttf2woff2())
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
    .pipe(app.gulp.dest(app.path.build.fonts))
);

export const ttfToWoff = convertTtfTo("woff");
export const ttfToWoff2 = convertTtfTo("woff2");



/*
export const fontsStyle = () => {
    const fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
  
    fs.readdir(app.path.build.fonts, (err, fontsFiles) => {
      if (err) {
        console.log('Error reading font directory:', err);
        return;
      }
  
      if (!fs.existsSync(fontsFile)) {
        fs.writeFile(fontsFile, "", (writeErr) => {
          if (writeErr) {
            console.log('Error writing to fonts.scss:', writeErr);
            return;
          }
  
          let c_fontname;
          for (let i = 0; i < fontsFiles.length; i++) {
            let fontFileName = fontsFiles[i].split(".")[0];
  
            if (c_fontname !== fontFileName) {
              fs.appendFile(fontsFile, `@include font("${fontFileName}", "${fontFileName}", "400", "normal");\r\n`, (appendErr) => {
                if (appendErr) {
                  console.log('Error appending to fonts.scss:', appendErr);
                }
              });
            }
            c_fontname = fontFileName;
          }
        });
      } else {
        console.log('Error: fonts.scss file already exists.');
      }
    });
  };*/

  export const fontsStyle = async () => {
	try {
		if (!fs.existsSync('./src/scss/base/_fonts.scss')) {
			return app.gulp.src(`${app.path.buildFolder}/fonts/*.woff`).pipe(
				fontfacegen({
					filepath: './src/scss/base',
					filename: '_fonts.scss',
                    embed: ['ttf'],
                    subset: 'abcdef',
                    collate: true
				}),
			)
		}
	} catch (err) {
		console.error(err)
	}
}