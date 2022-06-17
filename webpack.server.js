const { merge } = require('webpack-merge');
const webpackNodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base');

const config = {
    target: 'node',
    entry: './server/server.tsx',
    output: {
        filename: 'server.js',
    },
    externals: [
        webpackNodeExternals({ allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i] }),
    ],
};

module.exports = merge(baseConfig, config);
