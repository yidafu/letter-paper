const path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const base = require('./webpack.base');
const mock = require('../mock');

module.exports = merge(base, {

  mode: 'development',

  output: {
    filename: '[name].boudle.js',
    path: path.join(__dirname, '../dist')
  },

  devServer: {
    after: mock,
    clientLogLevel: 'warning',
    contentBase: path.join(__dirname, '../dist'),
  },

  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [{
          loader: 'vue-style-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'postcss-loader',
          options: {
            parser: 'postcss-scss',
            plugins: (loader) => [
              require('postcss-import')({
                root: loader.resourcePath
              }),
              require('postcss-preset-env')(),
              require('cssnano')()
            ]
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }]
      },

    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new CleanWebpackPlugin(['dist']),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static',
    //   analyzerHost: '127.0.0.1',
    //   analyzerPort: 8888, // 运行后的端口号
    //   reportFilename: 'report.html',
    //   defaultSizes: 'parsed',
    //   openAnalyzer: true,
    //   generateStatsFile: false,
    //   statsFilename: 'stats.json',
    //   statsOptions: null,
    //   logLevel: 'info'
    // }),
  ]
});
