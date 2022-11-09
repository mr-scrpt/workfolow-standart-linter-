import webpack from 'webpack-stream'

import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'

/*import HTMLInlineCSSWebpackPlugin from "html-inline-css-webpack-plugin";*/

/*const commonCSS = ({ sourceMap = false } = { sourceMap: false }) => ({
	loader: "css-loader",
	options: {
		sourceMap: false,
	},
});*/

export const js = () => {
  return app.gulp
    .src(app.direction.src.js, { sourcemaps: app.isDev })
    .pipe(
      app.plugin.plumber(
        app.plugin.notify.onError({
          title: 'JS',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(
      webpack({
        mode: app.isBuild ? 'production' : 'development',
        output: {
          filename: 'app.min.js',
        },
        module: {
          rules: [
            {
              test: /\.css$/i,

              use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: false,
                  },
                },
              ],
            },
          ],
        },
        optimization: {
          minimize: true,
          minimizer: [
            new CssMinimizerPlugin({
              test: /\.css$/i,
              minimizerOptions: {
                preset: [
                  'default',
                  {
                    discardComments: { removeAll: true },
                  },
                ],
              },
            }),
          ],
        },
        plugins: [
          new MiniCssExtractPlugin({
            filename: `../../${app.direction.build.css}/vendor.css`,
            chunkFilename: `../../${app.direction.build.css}/vendor.css`,
          }),
        ],
      })
    )
    .pipe(app.gulp.dest(app.direction.build.js))
    .pipe(app.plugin.browsersync.stream())
}
