const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

const config = {
    target: 'web',
    entry: './src/client.tsx',
    output: {
        filename: 'client.js',
    },
};

module.exports = merge(baseConfig, config);
