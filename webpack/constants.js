const path = require('path');

const devtoolMap = {
    development: 'inline-source-map',
    production: 'source-map'
}

const filenames = {
    developmentAppBundle: '[name].bundle.js',
    productionAppBundle: '[name].[contenthash].bundle.js',
    productionCSSBundle: 'style.[contenthash].css'
}

const modeMap = {
    development: 'development',
    production: 'production'
}

const pathMap = {
    output: path.join(__dirname, '..', 'dist'),
    src: path.join(__dirname, '..', 'src')
};

module.exports = {
    devtoolMap,
    filenames,
    modeMap,
    pathMap
};
