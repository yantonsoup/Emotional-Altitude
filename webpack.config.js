var path = require('path');
var webpack = require('webpack');
var css = require("!style-loader!css-loader!sass-loader!./file.scss");

module.exports = {
  entry: './lib/index.jsx',
  output: { path: __dirname, filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};
