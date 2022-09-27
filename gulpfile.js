// Основной модуль
import gulp from "gulp";
// Импорт путей
import { path } from "./configs/config/path.js";
// Импорт общих плагинов
import { plugins } from "./configs/config/plugins.js";

import { data } from "./src/data/index.js";
/*import "./src/data";*/
// Передаем значения в глобальную переменную
global.app = {
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  path,
  gulp,
  plugins,
  data,
};

// Импорт задач
import { copy } from "./configs/tasks/copy.js";
import { reset } from "./configs/tasks/reset.js";
import { nunjaks } from "./configs/tasks/nunjaks.js";
import { server } from "./configs/tasks/server.js";
import { scss } from "./configs/tasks/scss.js";
import { js } from "./configs/tasks/js.js";
import { images } from "./configs/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./configs/tasks/fonts.js";
/* import { svgSprive } from "./configs/tasks/svgSprive.js"; */
import { zip } from "./configs/tasks/zip.js";
import { ftp } from "./configs/tasks/ftp.js";

// Наблюдатель за изменениями в файлах
function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.nunjaks, nunjaks); //gulp.series(html, ftp)
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

// Последовательная обработака шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

// Основные задачи
const mainTasks = gulp.series(fonts, gulp.parallel(copy, nunjaks, scss, js, images));

// Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

// Экспорт сценариев
/* export { svgSprive }; */
export { dev };
export { build };
export { deployZIP };
export { deployFTP };

// Выполнение сценария по умолчанию
gulp.task("watch", dev);
