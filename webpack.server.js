const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './server.tsx',
    target: 'node',
    externals: [nodeExternals({ allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i] })],
    output: {
        path: path.resolve(__dirname),
        filename: 'server.js',
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                            '@babel/preset-typescript',
                        ],
                    },
                },
            },
            {
                test: /\.css$/i,
                loader: 'null-loader',
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'null-loader',
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'null-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};
