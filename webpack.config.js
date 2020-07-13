const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config();

module.exports = envOptions => {
  const mode = envOptions && envOptions.production ? 'production' : 'development';

  return {
    entry: path.resolve(__dirname, './src/index.jsx'),
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, './dist'),
      publicPath: '/',
    },
    resolve: {
      extensions: ['.jsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: ['babel-loader', 'eslint-loader'],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|gif|woff|ttf|eot|mp3)$/,
          use: ['file-loader'],
        },
      ],
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: process.env.PORT || 3000,
      historyApiFallback: true,
      watchContentBase: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, './_redirects'),
            to: path.resolve(__dirname, './dist/_redirects'),
            toType: 'file',
          },
        ],
      }),
    ],
    devtool: 'source-map',
    mode,
  };
};
