
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件
const path = require('path');
module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, use:['babel-loader'] ,exclude:/node_modules/},
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './index.html'})
  ]
};