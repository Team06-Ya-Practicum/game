const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

const config = {
    target: 'web',
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
    },
};

module.exports = merge(baseConfig, config);
