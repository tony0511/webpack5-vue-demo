// webpack 生产环境配置
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack.common');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(commonConfig, {
  // 设置模式为生产环境
  mode: 'production',
  // Source Map 生成方式
  devtool: 'nosources-source-map',
  // 优化策略
  optimization: {
    splitChunks: {
      // 会把公共的模块抽离出打包到一起
      chunks: 'all',
    },
  },
  plugins: [
    // 定义变量
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('development'),
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin(),
  ],
});
