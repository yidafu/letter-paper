module.exports = {
  extends: [
    'eslint-config-alloy/vue',
  ],
  globals: {
    // 这里填入你的项目需要的全局变量
    // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
    //
    Vue: false
  },
  rules: {
    // 这里填入你的项目需要的个性化配置，比如：
    //
    // // @fixable 一个缩进必须用两个空格替代
    'indent': [
      'error',
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: true
      }
    ],
    'eol-last': ["error", "always"],
    "arrow-parens": "off",
    "valid-jsdoc": "off",
    "array-bracket-spacing": "off",
    "no-unused-vars": "off",
    "no-else-return": "off",
    "strict": "off",
    "linebreak-style": "off",
    "newline-per-chained-call": "off",
    "no-irregular-whitespace": [
      "error",
      {
        "skipComments": true
      }
    ],
    "comma-dangle": [
      "error",
      {
        "arrays": "only-multiline",
        "objects": "only-multiline"
      }
    ]
  }
};