const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { resolve } = require('./utils')
const common = require('./webpack.common')
const { merge } = require('webpack-merge')

const config = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: resolve('example/main.ts'),
  output: {
    path: resolve('dist'),
    filename: '[name].js'
  },
  devServer: {
    host: 'localhost',
    port: 9010,
    compress: true,
    liveReload: true,
    hot: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Example',
      template: resolve('example/index.html')
    })
  ]
})

module.exports = () => {
  const { https, host, port } = config.devServer
  const protocol = https ? 'https:' : 'http:'
  config.plugins.push(
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`Example is running here ${protocol}//${host}:${port}`]
      }
    })
  )
  return config
}
