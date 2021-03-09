const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    target: 'node',
    entry: {
        app: './client/index.tsx',
        server: './server/start.ts',
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '/dist'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            client: path.join(__dirname, './client/'),
        },
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
    devServer: {
        historyApiFallback: true,
        port: 7000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './www/index.html',
            minify: false,
            excludeChunks: ['server'],
        }),
        new StylelintPlugin({
            configFile: path.join(__dirname, './.stylelintrc.json'),
            context: path.join(__dirname, './client'),
        }),
        new MiniCssExtractPlugin(),
    ],
};
