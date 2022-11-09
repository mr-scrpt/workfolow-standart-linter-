import fileInclude from 'gulp-file-include'
import webpHtmlNosvg from 'gulp-webp-html-nosvg'
import versionNumber from 'gulp-version-number'
//import pug from "gulp-pug";

export const html = () => {
  return (
    app.gulp
      .src(app.direction.src.html)
      .pipe(
        app.plugin.plumber(
          app.plugin.notify.onError({
            title: 'HTML',
            message: 'Error: <%= error.message %>',
          })
        )
      )
      .pipe(fileInclude())
      /*
		.pipe(pug({
			// Cжатие HTML файла
			pretty: true,
			// Показывать в терминале какой файл обработан
			verbose: true
		}))
		*/
      .pipe(app.plugin.replace(/@img\//g, 'img/'))
      .pipe(app.plugin.ifCustom(app.isBuild, webpHtmlNosvg()))
      .pipe(
        app.plugin.ifCustom(
          app.isBuild,
          versionNumber({
            value: '%DT%',
            append: {
              key: '_v',
              cover: 0,
              to: ['css', 'js'],
            },
            output: {
              file: 'gulp/version.json',
            },
          })
        )
      )
      .pipe(app.gulp.dest(app.direction.build.html))
      .pipe(app.plugin.browsersync.stream())
  )
}
