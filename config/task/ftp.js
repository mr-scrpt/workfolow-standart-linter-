import { configFTP } from '../setting/ftp.js'
import vinylFTP from 'vinyl-ftp'
import util from 'gulp-util'

export const ftp = () => {
  configFTP.log = util.log
  const ftpConnect = vinylFTP.create(configFTP)
  return app.gulp
    .src(`${app.direction.buildFolder}/**/*.*`, {})
    .pipe(
      app.plugin.plumber(
        app.plugin.notify.onError({
          title: 'FTP',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(ftpConnect.dest(`/${app.direction.ftp}/${app.direction.rootFolder}`))
}

