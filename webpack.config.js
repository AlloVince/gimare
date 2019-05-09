const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('dotenv').config();
const CopyPlugin = require('copy-webpack-plugin');


const DLL_JS = process.env.DLL_JS;
const isProduction = process.env.NODE_ENV && process.env.NODE_ENV.startsWith('production');

const plugins = [
  new webpack.DefinePlugin({
    'process.env': JSON.stringify(Object.assign({ NODE_ENV: process.env.NODE_ENV }, {}))
  }),
  new CopyPlugin([
    { from: './node_modules/reveal.js/plugin', to: 'plugin' },
  ]),
];


plugins.push(new HtmlWebpackPlugin({
  filename: 'index.html',
  // favicon: path.resolve('./icons/favicon.ico'),
  template: 'template.html',
}));

const webpackConfig = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/index.js',
  output: {
    publicPath: isProduction ? '/' : '',
    path: `${__dirname}/dist`,
    filename: 'index_[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|gif|png|svg|woff|woff2|eot|ttf)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
        use: ['file-loader']
      },
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ],
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      }
    ]
  },
  plugins,
  devtool: 'source-map'
};

// console.log(require('util').inspect(webpackConfig))

module.exports = webpackConfig;
