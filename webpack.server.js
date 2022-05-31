const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

const config = {
    target: 'node',
    entry: './src/server.tsx',
    output: {
        filename: 'server.js',
    },
};

module.exports = merge(baseConfig, config);
