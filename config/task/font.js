// import { deleteAsync } from 'del'

import fs from 'fs'
import fonter from 'gulp-fonter-2'
import ttf2woff2 from 'gulp-ttf2woff2'
import path from 'path'
import { removeFolder } from './removeFolder.js'

export const removeFolderTmp = async () => {
  await removeFolder(app.direction.tempFolder)
}
export const moveFontToTmp = () => {
  return (
    app.gulp
      .src(path.resolve(app.direction.src.font), {})
      .pipe(
        app.plugin.plumber(
          app.plugin.notify.onError({
            title: 'FONTS',
            message: 'Error: <%= error.message %>',
          })
        )
      )
      // Выгружаем в папку с результатом
      .pipe(app.gulp.dest(path.resolve(app.direction.tempFolder)))
  )
}
export const otfToTtf = () => {
  // Ищем файлы шрифтов .otf
  return (
    app.gulp
      .src(path.resolve(app.direction.tempFolder, '*.otf'), {})
      .pipe(
        app.plugin.plumber(
          app.plugin.notify.onError({
            title: 'FONTS',
            message: 'Error: <%= error.message %>',
          })
        )
      )
      // Конвертируем в .ttf
      .pipe(
        fonter({
          formats: ['ttf'],
        })
      )
      // Выгружаем в исходную папку
      .pipe(app.gulp.dest(path.resolve(app.direction.tempFolder)))
    // .pipe(app.gulp.dest(`${app.direction.srcFolder}/font/`))
  )
}

export const ttfToWoff2 = () => {
  // Ищем файлы шрифтов .ttf
  return (
    app.gulp
      .src(path.resolve(app.direction.tempFolder, '*.ttf'), {})
      .pipe(
        app.plugin.plumber(
          app.plugin.notify.onError({
            title: 'FONTS',
            message: 'Error: <%= error.message %>',
          })
        )
      )
      // Конвертируем в .woff2
      .pipe(ttf2woff2())
      // Выгружаем в папку с результатом
      .pipe(app.gulp.dest(path.resolve(app.direction.tempFolder)))
  )
}

export const ttfToWoff = () => {
  // Ищем файлы шрифтов .ttf
  return (
    app.gulp
      .src(path.resolve(app.direction.tempFolder, '*.ttf'), {})
      .pipe(
        app.plugin.plumber(
          app.plugin.notify.onError({
            title: 'FONTS',
            message: 'Error: <%= error.message %>',
          })
        )
      )
      // Конвертируем в .woff
      .pipe(
        fonter({
          formats: ['woff'],
        })
      )
      // Выгружаем в папку с результатом
      // .pipe(app.gulp.dest(path.resolve('./build/', 'font')))
      // Ищем файлы шрифтов .ttf
      // .pipe(app.gulp.src(`${app.direction.srcFolder}/font/*.ttf`))
      // Конвертируем в .woff2
      // .pipe(ttf2woff2())
      // Выгружаем в папку с результатом
      // .pipe(app.gulp.dest(path.resolve(app.direction.srcFolder, 'font/')))
      .pipe(app.gulp.dest(path.resolve(app.direction.tempFolder)))
  )
}

export const moveFontToBuild = () => {
  return (
    app.gulp
      .src(path.resolve(app.direction.tempFolder, '*.{ttf,woff,woff2}'), {})
      .pipe(
        app.plugin.plumber(
          app.plugin.notify.onError({
            title: 'FONTS',
            message: 'Error: <%= error.message %>',
          })
        )
      )
      // Выгружаем в папку с результатом
      .pipe(app.gulp.dest(path.resolve(app.direction.build.font)))
  )
}

export const fontsStyle = async () => {
  // Файл стилей подключения шрифтов
  let pathToFontFile = path.resolve(
    app.direction.srcFolder,
    'style/preset/font.scss'
  )
  // `${app.direction.srcFolder}/style/preset/font.scss`
  await removeFolder(pathToFontFile)
  // Проверяем существуют ли файлы шрифтов
  fs.readdir(app.direction.build.font, function (err, fontsFiles) {
    if (fontsFiles) {
      // Проверяем существует ли файл стилей для подключения шрифтов
      if (!fs.existsSync(pathToFontFile)) {
        // Если файла нет, создаем его
        fs.writeFile(pathToFontFile, '', cb)
        let newFileOnly
        for (var i = 0; i < fontsFiles.length; i++) {
          // Записываем подключения шрифтов в файл стилей
          let fontFileName = fontsFiles[i].split('.')[0]
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split('-')[0]
              ? fontFileName.split('-')[0]
              : fontFileName
            let fontWeight = fontFileName.split('-')[1]
              ? fontFileName.split('-')[1]
              : fontFileName
            if (fontWeight.toLowerCase() === 'thin') {
              fontWeight = 100
            } else if (fontWeight.toLowerCase() === 'extralight') {
              fontWeight = 200
            } else if (fontWeight.toLowerCase() === 'light') {
              fontWeight = 300
            } else if (fontWeight.toLowerCase() === 'medium') {
              fontWeight = 500
            } else if (fontWeight.toLowerCase() === 'semibold') {
              fontWeight = 600
            } else if (fontWeight.toLowerCase() === 'bold') {
              fontWeight = 700
            } else if (
              fontWeight.toLowerCase() === 'extrabold' ||
              fontWeight.toLowerCase() === 'heavy'
            ) {
              fontWeight = 800
            } else if (fontWeight.toLowerCase() === 'black') {
              fontWeight = 900
            } else {
              fontWeight = 400
            }
            fs.appendFile(
              pathToFontFile,
              `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"),url("../fonts/${fontFileName}.ttf") format("ttf"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`,
              cb
            )
            newFileOnly = fontFileName
          }
        }
      } else {
        // Если файл есть, выводим сообщение
        console.log(
          '===>>> Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить!'
        )
      }
    }
  })

  return app.gulp.src(app.direction.srcFolder)
  function cb() {}
}
