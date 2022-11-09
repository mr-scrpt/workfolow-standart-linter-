// Получаем имя папки проекта
import * as nodePath from 'path'
const rootFolder = nodePath.basename(nodePath.resolve())

const buildFolder = `./build` // Также можно использовать rootFolder
const srcFolder = `./src`
const tempFolder = `./tmp`

export const direction = {
  build: {
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    html: `${buildFolder}/`,
    nunjak: `${buildFolder}/`,
    image: `${buildFolder}/img/regular/`,
    sprite: `${buildFolder}/img/sprite/`,
    font: `${buildFolder}/font/`,
    file: `${buildFolder}/file/`,
  },
  src: {
    js: `${srcFolder}/js/app.js`,
    image: `${srcFolder}/img/regular/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
    // svg: `${srcFolder}/img/**/*.svg`,
    scss: `${srcFolder}/style/style.scss`,
    html: `${srcFolder}/*.html`, //.pug
    nunjak: `${srcFolder}/view/page/*.njk`, //.pug
    font: `${srcFolder}/font/*.{woff,woff2,ttf,otf}`,
    file: `${srcFolder}/file/**/*.*`,
    sprite: `${srcFolder}/img/sprite/**/*.svg`,
  },
  watch: {
    js: `${srcFolder}/js/**/*.js`,
    scss: `${srcFolder}/style/**/*.scss`,
    html: `${srcFolder}/**/*.html`, //.pug
    nunjak: `${srcFolder}/**/*.njk`, //.pug
    image: `${srcFolder}/img/regular/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
    sprite: `${srcFolder}/img/sprite/**/*.svg`,
    file: `${srcFolder}/file/**/*.*`,
  },
  clean: buildFolder,
  buildFolder,
  srcFolder,
  tempFolder,
  rootFolder,
  ftp: ``,
}
