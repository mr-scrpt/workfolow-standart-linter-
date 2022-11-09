export const copy = () => {
  return app.gulp
    .src(app.direction.src.file)
    .pipe(app.gulp.dest(app.direction.build.file))
}

