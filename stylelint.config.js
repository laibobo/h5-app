module.exports = {
  defaultSeverity: 'error',
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  plugins: ['stylelint-scss', 'stylelint-order'],
  rules: {
    // 不要使用已被 autoprefixer 支持的浏览器前缀
    'media-feature-name-no-vendor-prefix': true,
    'at-rule-no-vendor-prefix': true,
    'selector-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,
    'value-no-vendor-prefix': true,
    'font-family-no-missing-generic-family-keyword': false
  }
}
