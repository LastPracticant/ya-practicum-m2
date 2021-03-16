const path = require('path');
const StylelintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './client/index.tsx',
    output: {
        filename: 'app.js',
        path: path.join(__dirname, './dist'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            client: path.join(__dirname, './client/'),
            server: path.join(__dirname, './server/'),
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
    plugins: [
        new StylelintPlugin({
            configFile: path.join(__dirname, './.stylelintrc.json'),
            context: path.join(__dirname, './client'),
        }),
        new MiniCssExtractPlugin(),
    ],
};
