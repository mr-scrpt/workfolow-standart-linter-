import { deleteSync } from 'del'
import zipPlugin from 'gulp-zip'

export const zip = () => {
  deleteSync(`./${app.direction.rootFolder}.zip`)
  return app.gulp
    .src(`${app.direction.buildFolder}/**/*.*`, {})
    .pipe(
      app.plugin.plumber(
        app.plugin.notify.onError({
          title: 'ZIP',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(zipPlugin(`${app.direction.rootFolder}.zip`))
    .pipe(app.gulp.dest('./'))
}
