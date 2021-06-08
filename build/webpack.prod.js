const TerserPlugin = require('terser-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const webpack = require('webpack')
const common = require('./webpack.common')
const { merge } = require('webpack-merge')
const { resolve } = require('./utils')
const { name, version } = require('../package.json')

module.exports = merge(common, {
  mode: 'production',
  entry: {
    [name]: resolve('src/index.ts'),
    [`${name}.min`]: resolve('src/index.ts')
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    library: name.toUpperCase(),
    libraryTarget: 'umd'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.min.js(\?.*)?$/i,
        extractComments: false
      })
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `${name}.js\ndescription: Provide shared js api\nversion: ${version}`
    }),
    new ESLintPlugin({
      extensions: ['js', 'ts']
    })
  ]
})
