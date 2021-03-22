const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { IS_DEV } = require('./env');

module.exports = {
    mode: IS_DEV ? 'development' : 'production',
    entry: [
        IS_DEV ? 'react-hot-loader/patch' : '',
        IS_DEV ? 'webpack-hot-middleware/client' : '',
        IS_DEV ? 'css-hot-loader/hotModuleReplacement' : '',
        './client/index.tsx',
    ].filter(Boolean),
    output: {
        filename: 'app.js',
        path: IS_DEV ? __dirname : path.join(__dirname, './dist'),
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
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        babelrc: false,
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-typescript',
                            '@babel/preset-react',
                        ],
                        plugins: [
                            ['@babel/plugin-proposal-decorators', { legacy: true }],
                            ['@babel/plugin-proposal-class-properties', { loose: true }],
                            'react-hot-loader/babel',
                        ],
                    },
                },
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

console.info('--------------- enviroment "mode" is:', process.env.NODE_ENV, '---------------');
