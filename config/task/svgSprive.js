import svgSprite from 'gulp-svg-sprite'
export const svgSprive = () => {
  return app.gulp
    .src(`${app.direction.src.sprite}`, {})
    .pipe(
      app.plugin.plumber(
        app.plugin.notify.onError({
          title: 'SVG',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: `../icon.svg`,
            // Создавать страницу с перечнем иконок
            example: true,
          },
        },
      })
    )
    .pipe(app.gulp.dest(app.direction.build.sprite))
}
