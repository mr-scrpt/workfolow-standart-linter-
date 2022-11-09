// Основной модуль
import gulp from 'gulp'
// Импорт путей
import { direction } from './config/setting/direction.js'
// Импорт общих плагинов
import { plugin } from './config/setting/plugin.js'

import { data } from './src/data/index.js'
/*import "./src/data";*/
// Передаем значения в глобальную переменную
global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  direction,
  gulp,
  plugin,
  data,
}

// Импорт задач
import { copy } from './config/task/copy.js'
import { removeFolderBuild } from './config/task/removeFolderBuild.js'
import { nunjak } from './config/task/nunjak.js'
import { server } from './config/task/server.js'
import { scss } from './config/task/scss.js'
import { js } from './config/task/js.js'
import { image } from './config/task/image.js'
import {
  otfToTtf,
  ttfToWoff,
  ttfToWoff2,
  moveFontToTmp,
  moveFontToBuild,
  fontsStyle,
  removeFolderTmp,
} from './config/task/font.js'
import { svgSprive } from './config/task/svgSprive.js'
import { zip } from './config/task/zip.js'
import { ftp } from './config/task/ftp.js'

// Наблюдатель за изменениями в файлах
function watcher() {
  gulp.watch(direction.watch.file, copy)
  gulp.watch(direction.watch.nunjak, nunjak) //gulp.series(html, ftp)
  gulp.watch(direction.watch.scss, scss)
  gulp.watch(direction.watch.js, js)
  gulp.watch(direction.watch.image, image)
  gulp.watch(direction.watch.sprite, svgSprive)
}

// Последовательная обработака шрифтов
// const font = gulp.series(otfToTtf, ttfToWoff, fontsStyle)
const font = gulp.series(
  moveFontToTmp,
  otfToTtf,
  ttfToWoff,
  ttfToWoff2,
  moveFontToBuild,
  fontsStyle,
  removeFolderTmp
)

// Основные задачи
const maintask = gulp.series(
  font,
  gulp.parallel(copy, nunjak, scss, js, image, svgSprive)
)

// Построение сценариев выполнения задач
const dev = gulp.series(
  removeFolderBuild,
  maintask,
  gulp.parallel(watcher, server)
)
const build = gulp.series(removeFolderBuild, maintask)
const deployZIP = gulp.series(removeFolderBuild, maintask, zip)
const deployFTP = gulp.series(removeFolderBuild, maintask, ftp)

// Экспорт сценариев
export { svgSprive }
export { dev }
export { build }
export { deployZIP }
export { deployFTP }

// Выполнение сценария по умолчанию
gulp.task('watch', dev)
// Выполнение сценария по умолчанию
gulp.task('img', image)
gulp.task('font', font)
