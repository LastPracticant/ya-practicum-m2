const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const StylelintPlugin = require('stylelint-webpack-plugin')

module.exports = {
    entry: "./client/index.tsx",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    module: {
        rules: [
        {
            test: /\.tsx?$/,
            use: "ts-loader",
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            use: [
                "style-loader",
                "css-loader",
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: [
                                ["postcss-preset-env"],
                                ["postcss-nested"],
                            ],
                        },
                    },
                }
            ]
        }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./www/index.html"
        }),
        new StylelintPlugin()
    ]
}
