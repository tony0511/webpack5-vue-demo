// webpack 开发环境配置
const { resolve } = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');

let isLint = false;
const index = process.argv.findIndex(item => item === '--env');
if (index > -1 && process.argv[index + 1] === 'lint') isLint = true;

module.exports = merge(commonConfig, {
  // 设置模式为开发环境
  mode: 'development',
  // Source Map 生成方式
  devtool: 'eval-cheap-module-source-map',
  // 配置本地开发服务
  // 注：webpack 4 启动命令为 webpack-dev-server，但 webpack 5 启动命令改为 webpack serve
  devServer: {
    // 指定内容加载的路径
    contentBase: resolve('dist'),
    // 是否采用 gzip 压缩
    compress: true,
    // 端口号
    port: 8888,
    // 启用自动更新，以下是 webpack-dev-server@3.11.2 版本
    // 注：这是 webpack 5 新的选项，此时必须禁用 devServer.hot 选项或必须启用 devServer.watchContentBase 选项，才能使 liveReload 生效，另外还要指定 webpack 打包的目标 target 属性为 web
    liveReload: true,
    // 指定要使用的 host。如果希望服务器可从外部访问，请按以下方式进行配置
    // host: '0.0.0.0',
    // 启动完成是否自动打开浏览器
    // open: true,
    // 设置代理
    proxy: {
      // 需要代理的路径匹配规则，即表示以 /api_service 开头的路径需要代理
      '/api': {
        // 设置代理目标地址：https://localhost:8888/api/users => https://api.github.com/api/users
        target: 'https://api.github.com',
        // 重写路径：https://api.github.com/api/users => https://api.github.com/users
        pathRewrite: {
          '^/api/': '/',
        },
        // 改变请求头里的主机名，Host: localhost:8888 => Host: api.github.com
        changeOrigin: true,
      },
    },
  },
  plugins: [
    // 定义变量
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('development'),
    }),
    ...(isLint ? [
      // 使用 eslint
      new EslintWebpackPlugin({
        // 需要进行格式校验的文件后缀名
        extensions: ['js', 'vue'],
        // 需要进行格式校验的目录或文件
        files: ['./src'],
      }),
      // 使用 stylelint
      new StylelintWebpackPlugin({
        // 需要进行格式校验的文件后缀名
        extensions: ['css', 'less', 'scss', 'sass', 'vue'],
        // 需要进行格式校验的目录或文件
        files: ['./src'],
      }),
    ] : []),
  ],
});
