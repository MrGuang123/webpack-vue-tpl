module.exports = {
  "extends": ["plugin:vue/essential", "airbnb-base/legacy"],
  // "parser": "babel-eslint",
  "parserOptions": {
    "parser": "babel-eslint",
  },
  "env": {
    "browser": true,
    // "node": true
  },
  "plugins": ["vue"],
  "rules": {
    // 检查分号
    "semi": 0,
    // 数组一致空格
    "array-bracket-spacing": 0,
    // 驼峰命名
    "camelcase": 2,
    // 不能有console
    "no-console": 0,
    // 不能使用new
    "no-new": 0,
    // 最后应该有一个新行
    "eol-last": 0
  }
}