const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: '[name].[contenthash].js',
    path: path.join(__dirname, '/dist'),
    clean: true,
    publicPath: '/',
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react',
          chunks: 'all',
        },
        vendors: {
          test: /\/node_modules\//i,
          chunks: 'all',
        },
      },
    },
    runtimeChunk: { name: 'runtime' },
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
      '@lib': path.resolve(__dirname, './src/lib'),
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
    ],
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'Caching',
    }),
  ],
  devtool: 'hidden-source-map',
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
    open: true,
    hot: true,
    static: path.resolve(__dirname, 'dist'),
    client: {
      reconnect: false,
    },
  },
};
