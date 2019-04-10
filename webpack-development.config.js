var path = require('path');

module.exports = {
    entry: './src/index.js',
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'docs', 'dist'),
        libraryTarget: 'umd',
        library: 'gown',
        filename: 'gown.js'
    },
    externals: {
        'pixi.js': {
            commonjs: 'pixi.js',
            amd: 'pixi.js',
            root: 'PIXI' // indicates global variable
        }
    }
};
