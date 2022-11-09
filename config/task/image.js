import webp from 'gulp-webp'
import imagemin from 'gulp-imagemin'

export const image = () => {
  return (
    app.gulp
      .src(app.direction.src.image)
      .pipe(
        app.plugin.plumber(
          app.plugin.notify.onError({
            title: 'IMAGES',
            message: 'Error: <%= error.message %>',
          })
        )
      )
      .pipe(app.plugin.newer(app.direction.build.image))
      .pipe(app.plugin.ifCustom(app.isBuild, webp()))
      .pipe(
        app.plugin.ifCustom(
          app.isBuild,
          app.gulp.dest(app.direction.build.image)
        )
      )
      .pipe(
        app.plugin.ifCustom(app.isBuild, app.gulp.src(app.direction.src.image))
      )
      .pipe(
        app.plugin.ifCustom(
          app.isBuild,
          app.plugin.newer(app.direction.build.image)
        )
      )
      .pipe(
        app.plugin.ifCustom(
          app.isBuild,
          imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3, // 0 to 7
          })
        )
      )
      .pipe(app.gulp.dest(app.direction.build.image))
      // .pipe(app.gulp.src(app.direction.src.svg))
      // .pipe(app.gulp.dest(app.direction.build.image))
      .pipe(app.plugin.browsersync.stream())
  )
}
