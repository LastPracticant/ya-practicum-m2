const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { IS_DEV } = require('./env');
const babelLoader = require('./webpack.babel.loader');

module.exports = {
    mode: IS_DEV ? 'development' : 'production',
    entry: [
        IS_DEV && 'webpack-hot-middleware/client?noInfo=true',
        IS_DEV && 'react-hot-loader/patch',
        IS_DEV && 'css-hot-loader/hotModuleReplacement',
        './client/index.tsx',
    ].filter(Boolean),
    output: {
        filename: '[name].js',
        path: IS_DEV ? __dirname : path.join(__dirname, './dist'),
        publicPath: '/',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: IS_DEV ? {
            'react-dom': '@hot-loader/react-dom',
        } : undefined,
        plugins: [new TsconfigPathsPlugin()],
    },
    module: {
        rules: [
            babelLoader,
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
                test: /\.(png|jpe?g|gif|mp3)$/i,
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
        new Dotenv(),
        new ForkTsCheckerWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new CopyPlugin({
            patterns: [
                { from: './sw', to: './' },
            ],
            options: {
                concurrency: 100,
            },
        }),
        IS_DEV ? new webpack.HotModuleReplacementPlugin() : '',
    ].filter(Boolean),
};

console.info('--------------- Enviroment "mode" is:', process.env.NODE_ENV, '---------------');
