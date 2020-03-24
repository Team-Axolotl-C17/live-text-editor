const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  devServer: {
    contentBase: path.resolve(__dirname, 'client'),
    publicPath: path.join(__dirname, '/dist/'),
    compress: true,
    hot:true,
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
            presets: ['@babel/preset-env', '@babel/preset-react'],
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
};
