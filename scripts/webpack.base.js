const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
/*
@ref https://github.com/webpack/webpack/issues/6568
```shell
yarn add extract-text-webpack-plugin@next -D
```
 */
// const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

module.exports = {
  entry: {
    index: './src/main.js'
  },

  output: {
    filename: '[name].boudle.js',
    path: path.join(__dirname, '../dist')
  },

  resolve: {
    alias: {
      '@': path.join(__dirname, '../src'),
      'component': path.join(__dirname, '../src/compoenent'),
      'squid': path.join(__dirname, '../src/squid'),
    },
    extensions: ['.vue', '.js', '.json']
  },

  module: {
    rules: [
    {
      test: /\.js$/,
      exclude: file => (
        /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
      ),
      use: [{
        loader: 'source-map-loader'
      }, {
        loader: 'babel-loader',
      }]
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader'
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
      }]
    },
    {
      test: /\.css$/,
      use: [
        'vue-style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[local]_[hash:base64:8]',
            importLoaders: 1
          }
        },
        'postcss-loader'
      ]
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
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'My Blog App',
      template: './public/index.html',
      filename: 'index.html',
    }),
  ],
};
