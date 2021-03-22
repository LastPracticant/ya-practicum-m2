const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { IS_DEV } = require('./env');

module.exports = {
    mode: IS_DEV ? 'development' : 'production',
    target: 'node',
    externals: [nodeExternals()],
    entry: './server/start.ts',
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, './dist'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [new TsconfigPathsPlugin()],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    'css-loader',
                    {
                        loader: 'null-loader',
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
};
