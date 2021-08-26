module.exports = {
  root: true,
  parser: 'vue-eslint-parser', // 解析器，默认使用 Espree
  parserOptions: {
    ecmaVersion: 12,
  },
  // 校验的规则集，可以省略包名的前缀 eslint-config-，当前配置的是 eslint-config-airbnb-base
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  // 配置适用的运行环境，因为不同环境定义了不同环境的全局变量，比如 browser 设置成 true，则 window 对象可以直接使用，eslint 校验不会报错，否则会报 window 未定义的错
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  // 设置全局变量，writable：允许重写变量，readonly：只读变量，off：禁用该变量
  globals: {
    $: 'readonly',
    // jquery: 'readonly',
    // moment: 'readonly',
  },
  // 修改默认规则，如果值是数组，那么数组的第一项是规则的严重程度，后面的为额外的选项值
  // 'off' 或 0 - 关闭规则
  // 'warn' 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
  // 'error' 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
  rules: {
    // 新增一些规则
    'indent': ['error', 2],
    'semi': ['error', 'always'],
    // 覆盖某些默认规则
    // 'no-cond-assign': ['error', 'always'],
    // 禁用某些规则
    'no-console': 'off',
    'max-len': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'linebreak-style': 'off',
  },
}
