const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@common': path.resolve(__dirname, './src/common'),
      '@apis': path.resolve(__dirname, './src/apis'),
      '@static': path.resolve(__dirname, './src/static'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.(png|jpeg|jpg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
  
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    port: 3000,
    open: true,
    hot: true,
    static: path.resolve(__dirname, "dist"),
  },
};