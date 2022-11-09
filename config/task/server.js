export const server = (done) => {
  app.plugin.browsersync.init({
    server: {
      baseDir: `${app.direction.build.html}`,
    },
    open: false,
    notify: false,
    port: 3000,
  })
}
