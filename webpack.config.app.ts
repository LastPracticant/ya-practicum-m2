import path from 'path';
import StylelintPlugin from 'stylelint-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import webpack from 'webpack';

export default {
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        './client/index.tsx',
    ],
    output: {
        filename: 'app.js',
        path: path.join(__dirname, './dist'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            client: path.join(__dirname, './client/'),
            server: path.join(__dirname, './server/'),
            'react-dom': '@hot-loader/react-dom',
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
        new CopyPlugin({
            patterns: [
                { from: './sw', to: './' },
            ],
            options: {
                concurrency: 100,
            },
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
};
