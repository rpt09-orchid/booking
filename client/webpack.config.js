const webpack = require('webpack');
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');

module.exports = env => {

  const envVars = dotenv.config().parsed;

  const envKeys = Object.keys(envVars).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(envVars[next]);
    return prev;
  }, {});

  return {
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, './public'),
      filename: './app.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: [
            { loader: "style-loader" },
            { loader: "css-loader" },
          ]
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {},
            },
          ],
        }
      ]
    },


    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new webpack.DefinePlugin(envKeys)
    ]
  }
}