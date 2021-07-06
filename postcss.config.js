
const plugins = [
  require('autoprefixer'),
  {
    'postcss-px-to-viewport': {
      unitToConvert: 'px',
      viewportWidth: 750,
      unitPrecision: 5,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 0.5,
      mediaQuery: false,
      replace: true,
      exclude: /node_modules/,
      include: /src/,
      landscape: false,
      landscapeUnit: 'vw'
    }
  }
]
if(process.env.NODE_ENV === 'production'){
  plugins.push(require('cssnano'))
}
module.exports = {
  plugins
}
