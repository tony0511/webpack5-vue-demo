module.exports = {
  // cacheDirectory: true,
  // 加载预设
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        // 此选项表示 @babel/preset-env 如何处理 polyfill，可选值为 "usage"| "entry"| false，默认为 false
        // usage：按需加载使用，只有代码用到了哪个新的 api，它才会引入相应的 polyfill
        // entry：会在入口处把所有支持 targets 的 api 的 polyfill 引入进来
        // false：不为每个文件自动添加 polyfill，对import "core-js"或import "@babel/polyfill"也转换为引入单个 polyfill
        useBuiltIns: 'usage',
        // 指定 core-js 的版本，默认为"2.0"。该值可以是任何受支持的 core-js 版本。例如，"3.8"或"2.0"，并且此选项仅在 useBuiltIns 设置为 usage、entry 时才有效
        // corejs: 3,
        corejs: '3.16',
        // 需要支持的浏览器版本
        // targets: "defaults",
        targets: {
          chrome: '58',
          ie: '9',
          firefox: '60',
          safari: '10',
          edge: '17',
        },
      },
    ],
  ],
}
