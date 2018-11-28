const htmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require("clean-webpack-plugin")
const path = require('path')

module.exports = {
  entry: {
    common: "./js/common.js",
    index: "./js/index.js"
  },
  output: {
    filename: 'dist/[name].[hash:8].js',
    path: __dirname
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
      {test: /\.css$/, use: 'css-loader'}
    ],

  },
  plugins: [
    new cleanWebpackPlugin(
      [
        "dist",
        "index.html"
      ]
    ),
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: 'test.html'
    })
  ]
}