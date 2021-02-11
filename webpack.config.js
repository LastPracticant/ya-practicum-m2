const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
    entry: './client/index.tsx',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        modules: [path.resolve(__dirname, './client'), './node_modules'],
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
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    ['postcss-preset-env'],
                                    ['postcss-nested'],
                                ],
                            },
                        },
                    },
                ],
            },
        ],
    },
    devServer: {
        historyApiFallback: true,
        port: process.env.PORT || 3000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './www/index.html',
        }),
        new StylelintPlugin({
            configFile: path.resolve(__dirname, './.stylelintrc.json'),
            context: path.resolve(__dirname, './client'),
        }),
    ],
};
