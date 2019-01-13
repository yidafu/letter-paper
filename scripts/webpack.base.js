const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
/*
@ref https://github.com/webpack/webpack/issues/6568
```shell
yarn add extract-text-webpack-plugin@next -D
```
 */
// const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

module.exports = {
  entry: {index: './src/index.tsx'},

  output: {
    filename: '[name].boudle.js',
    path: path.join(__dirname, '../dist')
  },

  resolve: {
    alias: {
      '@': path.join(__dirname, '../src'),
      'component': path.join(__dirname, '../src/compoenent')
    },
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [{
        test: /\.(ts|tsx)?$/,
        loader: "awesome-typescript-loader"
      }, 
      // 这两行是处理 react 相关的内容
      {
        // enforce: "pre",
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [ {
            loader: "source-map-loader"
          }, {
            loader: 'babel-loader',
        }]
      },
     
      { // load font
        // Capture eot, ttf, woff, and woff2
        test: /\.(eot|ttf|woff|woff2)$/,
        use: {
          /**
           * url-loader 是 file-loader 的封装，返回指定文件的
           * DataUrl。但是如果文件大于指定的限制`limit`，就会
           * 默认使用 file-loader 来处理。
           * @type {String}
           */
          loader: 'url-loader',
          options: {
            limit: 4048,
            publicPath: './css/font/',
            outputPath: './css/font/',
            name: '[name].[ext]'
          }
        },
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/'
          }
        }, ]
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: false
          }
        }]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "My Blog App",
      template: './public/index.html',
      filename: "index.html",
    }),
  ],
};