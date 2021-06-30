module.exports = {
  root: true,
  extends: ['standard', 'plugin:vue/vue3-essential'],
  plugins: ['html', 'vue'],
  env: {
    node: true,
    browser: true
  },
  /**
   * https://cloud.tencent.com/developer/doc/1268
   * https://eslint.vuejs.org/rules/
  */
  rules: {
    'space-before-function-paren': ['error', 'never']
  }
}