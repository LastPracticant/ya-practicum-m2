const path = require('path');

module.exports = {
    target: 'node',
    entry: './server/start.ts',
    output: {
        filename: 'server.js',
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
};
