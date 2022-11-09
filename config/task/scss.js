import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import rename from 'gulp-rename'

import cleanCss from 'gulp-clean-css' // Сжатие CSS файла
import webpcss from 'gulp-webpcss' // Вывод WEBP изображений
import autoprefixer from 'gulp-autoprefixer' // Добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries' // Групировка медиа запросов

const sass = gulpSass(dartSass)

export const scss = () => {
  return (
    app.gulp
      .src(app.direction.src.scss, { sourcemaps: app.isDev })
      .pipe(
        app.plugin.plumber(
          app.plugin.notify.onError({
            title: 'SCSS',
            message: 'Error: <%= error.message %>',
          })
        )
      )
      .pipe(app.plugin.replace(/@img\//g, '../img/'))
      .pipe(
        sass({
          outputStyle: 'expanded',
        })
      )
      .pipe(app.plugin.ifCustom(app.isBuild, groupCssMediaQueries()))
      .pipe(
        autoprefixer({
          grid: true,
          overrideBrowserslist: ['last 3 versions'],
          cascade: true,
        })
      )
      .pipe(
        app.plugin.ifCustom(
          app.isBuild,
          webpcss({
            webpClass: '.webp',
            noWebpClass: '.no-webp',
          })
        )
      )
      // Раскомментировать если нужен не сжатый дубль файла стилей
      .pipe(app.gulp.dest(app.direction.build.css))
      .pipe(app.plugin.browsersync.stream())
      .pipe(app.plugin.ifCustom(app.isBuild, cleanCss()))
      .pipe(
        rename({
          extname: '.min.css',
        })
      )

      .pipe(app.gulp.dest(app.direction.build.css))
      .pipe(app.plugin.browsersync.stream())
  )
}
