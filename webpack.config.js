const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/app.tsx',
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        // host: '0.0.0.0',
        static: './dist',
        port: 1337,
        historyApiFallback: {
            index: '/',
        },
        server: {
            type: 'https',
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx|ts)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                        plugins: [
                            ['@babel/plugin-proposal-decorators', { legacy: true }],
                            'babel-plugin-parameter-decorator',
                        ],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            favicon: 'public/favicon.ico',
        }),
        new CopyPlugin({ patterns: [{ from: path.resolve(__dirname, 'public/base.css') }] }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
