const { resolve } = require('path');
const webpack = require('webpack');
const MiniCssExactPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  // 构建目标，默认为 web
  target: 'web',
  // 单入口配置
  entry: './src/main.js',
  // 出口配置
  output: {
    // 是否需要清理导出目录，这样的话就不需要再使用 clean-webpack-plugin了
    clean: true,
    path: resolve('dist'),
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[id].[contenthash:8].js',
    // publicPath: '/',
  },
  // 模块解析规则
  resolve: {
    // 设置路径解析别名
    alias: {
      '@': resolve('src'),
      '@css': resolve('src/css'),
      '@assets': resolve('src/assets'),
      '@components': resolve('src/components'),
    },
    // 设置拓展名
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.vue'],
  },
  // 排除打包依赖项
  externals: {
    'jquery': '$',
  },
  // 配置加载器
  module: {
    rules: [
      // 处理 js
      {
        test: /\.m?js$/i,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      // 处理 css
      {
        test: /\.css$/i,
        use: [
          MiniCssExactPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      // 处理 less
      {
        test: /\.less$/i,
        use: [
          MiniCssExactPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      // 处理 sass/scss
      {
        test: /\.s(a|c)ss$/i,
        use: [
          MiniCssExactPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      /* ======== 注意：webpack 5 将使用资源模块 Asset Modules，以下的 url-loader，file-loader，raw-loader不再维护了，需要尽快切换使用资源模块 Asset Modules 的方式 ========
       * asset/source：导出资源的源代码（之前通过 raw-loader 实现）
       * asset/resource：发送一个单独的文件并导出URL（之前通过 file-loader 实现）
       * asset/inline：导出一个资源的 Data URL（之前通过 url-loader 实现）
       * asset：在导出 asset/resource 和 asset/source 之间根据条件选择，比如根据文件大小（之前通过 url-loader 实现）
       */
      {
        test: /\.(png|jp?eg|gif)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            // 设置资源大小（默认为 8 kb），不超过则转成 base64，超过则输出为图片文件，单位为 byte
            maxSize: 8 * 1024,
          },
        },
        generator: {
          // 导出资源的名称，注：ext 已经包含了后缀名前面的点符号，所以 ext 占位符前面不需要再使用点符号了
          filename: 'image/[name].[contenthash:8][ext]',
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/i,
        // 使用资源模块处理资源
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
        generator: {
          filename: 'fonts/[name].[contenthash:8][ext]',
        },
      },
      {
        test: /\.vue$/i,
        loader: 'vue-loader',
      },
    ],
  },
  // 配置插件
  plugins: [
    // 拷贝文件
    new CopyWebpackPlugin({
      patterns: [
        {
          // 从指定的目录拷贝
          from: 'public',
          // 拷贝到指定的目录
          to: 'public',
        },
      ],
    }),
    // 抽离 css 为单独文件
    new MiniCssExactPlugin({
      // 导出文件名称，默认为 [name].css
      filename: 'css/[name].[contenthash:8].css',
    }),
    // 添加 HTML 文件
    new HtmlWebpackPlugin({
      // 模板源文件
      template: 'index.html',
      // 导出目标文件
      filename: 'index.html',
      // 页面标题
      title: 'vue-demo',
    }),
    new VueLoaderPlugin(),
  ],
}
