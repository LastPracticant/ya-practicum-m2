const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const IS_DEV = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: [
        IS_DEV ? 'react-hot-loader/patch' : '',
        IS_DEV ? 'webpack-hot-middleware/client' : '',
        IS_DEV ? 'css-hot-loader/hotModuleReplacement' : '',
        './client/index.tsx',
    ].filter(Boolean),
    output: {
        filename: 'app.js',
        path: path.join(__dirname, './dist'),
        publicPath: '/',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
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
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    'postcss-preset-env',
                                    'postcss-nested',
                                    'postcss-simple-vars',
                                    'postcss-color-mod-function',
                                ],
                            },
                        },
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
    plugins: [
        new MiniCssExtractPlugin(),
        new CopyPlugin({
            patterns: [
                { from: './sw', to: './' },
            ],
            options: {
                concurrency: 100,
            },
        }),
        new webpack.HotModuleReplacementPlugin(),
        IS_DEV ? new webpack.HotModuleReplacementPlugin() : '',
    ].filter(Boolean),
};
