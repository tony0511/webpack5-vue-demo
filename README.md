# webpack5-vue-demo 项目说明

**大致思路：**

- 首先应该初始化一个项目，并且安装 webpack 必要的插件，如 webpack、webpack-cli、webapck-dev-server，以及用于合并的 webpack-merge 插件
- 其次再写 webpack 的基本配置，比如 mode、target、devtool、entry、output 等
- 再写必要的 loader 和 plugins，主要是围绕 js、css、html 三部分
  - **js：** 主要使用到 @babel/code、@babel/preset-env、babel-loader、core-js，此时需要写好 babel.config.js 配置文件
  - **css：** 主要使用到 mini-extract-webpack-plugin、css-loader、less、less-loader、sass、sass-loader、postcss、postcss-loader、autoprefixer/postcss-preset-env，此时需要写好 postcss.config.js 配置文件和在 package.json 中配置好 browserslist 属性。
  - **html：** 主要使用到 html-webpack-loader 插件
- 因为资源模块处理已经集成在 webpack 5 中了，只需要按照 webpack 5 使用即可，无需额外安装插件
- 再写关于 vue 相关的配置，主要用到 vue、vue-loader、vue-template-compiler
- 再安装针对 js、css 必要的 lint 校验工具
  - **js：** 主要使用到 eslint、eslint-webpack-plugin、eslint-plugin-import、eslint-config-airbnb-base、eslint-plugin-vue，此时需要写好 .eslintrc.js  配置文件
  - **css：** 主要使用到 stylelint、stylelint-webpack-plugin、stylelint-config-standard，此时需要写好 stylelint.config.js 配置文件

- 再写关于本地开发服务的 devServer 配置
- 再写零碎的优化项配置
  - 打包前清理配置，设置 `output.clean: true`
  - 拷贝文件配置，使用到 copy-webpack-plugin 插件
  - 缓存相关配置，如文件名 hash 配置
  - 按需加载配置，如 `optimization.splitChunks.chunks: 'all'`
  - 模块解析配置，如 alias、extensions、modules 配置
  - 排除打包依赖配置，如 externals
  - 压缩 css 配置，使用到 optimize-css-assets-webpack-plugin 插件
  - 使用内部 webpack.DefinePlugin 插件定义全局环境替换变量
- 再修改 package.json 的脚本命令即可