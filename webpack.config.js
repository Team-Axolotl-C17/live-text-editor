const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  // devServer: {
  //   // contentBase: path.resolve(__dirname, 'client'),
  //   publicPath: '/build/',
  //   historyApiFallback: true,
  //   proxy: {
  //     '/users': 'http://localhost:3000'
  //   }
  // },
  mode: process.env.NODE_ENV,
  devServer: {
    //contentBase: path.resolve(__dirname, 'client'),
    publicPath: path.join(__dirname, '/dist/'),
    compress: true,
    port: 8080,
    proxy: {
      '/': 'http://localhost:3000'
    }
  },
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: './index.html'
    })
  ]
};
