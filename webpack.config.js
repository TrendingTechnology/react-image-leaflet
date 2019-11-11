const path = require('path');

/** @type import('webpack').Configuration */
module.exports = {
  mode: 'production',
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
  },
  entry: {
    index: './src/react-image-leaflet.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'react-image-leaflet.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(bmp|gif|jpe?g|png|svg|ttf|eot|woff?2?)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]',
        },
      },
    ],
  },
  devtool: 'source-map',
};
