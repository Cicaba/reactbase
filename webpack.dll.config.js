const path = require('path');
const webpack = require('webpack');
module.exports = {
  entry: {
    vendor: [
      'axios',
      'react',
      'redux',
      'react-redux',
      'react-router-dom'

    ]
  },
  output: {
    path: path.join(__dirname, 'public/vendor'),
    filename: '[name].dll.js',
    library: '[name]_[hash]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'public/vendor', '[name]-manifest.json'),
      name: '[name]_[hash]',
      context: process.cwd()
    })
  ]
};