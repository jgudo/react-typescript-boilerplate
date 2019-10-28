const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const resolve = (dir) => {
  return path.join(__dirname, '..', dir);
};
const isProduction = typeof NODE_ENV !== 'undefined' && NODE_ENV === 'production';

module.exports = {
  entry: [
    '@babel/polyfill', resolve('src/index.tsx')
  ],
  output: {
    path: resolve('dist'),
    filename: 'js/[name].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }, {
      test: /\.(ts|tsx)$/,
      use: {
        loader: 'ts-loader'
      },
      exclude: /node_modules/
    }, {
      test: /\.s?css$/,
      use: [{
        loader: MiniCssExtractPlugin.loader
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: !isProduction
        }
      }, {
        loader: 'sass-loader',
        options: {
          sourceMap: !isProduction
        }
      }]
    }, {
      test: /\.(png|svg|jpg|jpeg|gif)$/,
      use: [{
        loader: 'file-loader',
        options: {
          limit: 10000,
          outputPath: 'images',
          name: '[name].[hash].[ext]'
        }
      }]
    }, {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'file-loader',
      options: {
        limit: 10000,
        name: '[name].[hash].[ext]',
        outputPath: 'media'
      }
    }, {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: '[name].[hash].[ext]',
          outputPath: 'fonts'
        }
      }]
    }]
  }, 
  resolve: {
    modules: [
      resolve('src'),
      'node_modules'
    ],
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx']
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].[contenthash]_[id].css'
    })
  ]
};
