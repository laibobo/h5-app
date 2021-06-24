module.exports = {
    plugins: [
        require('autoprefixer'),
        require('cssnano'),
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
                exclude: undefined,
                include: /\/src\//,
                landscape: false,
                landscapeUnit: 'vw'
            }
        }
    ]
}