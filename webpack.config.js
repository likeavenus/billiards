const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const ESLintPlugin = require('eslint-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all"
        }
    };
    if (isProd) {
        config.minimizer = [
            new OptimizeCssPlugin(),
            new TerserPlugin()
        ]
    }
    return config;
};

module.exports = {
    context: path.resolve(__dirname, ''),
    mode: 'development',
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    optimization: optimization(),
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        watchContentBase: true,
        port: 9000,
        hot: isDev
    },
    devtool: isDev ? 'source-map' : '',
    plugins: [
        // new ESLintPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src/assets/favicon.ico'),
                to: path.resolve(__dirname, 'dist')
            },
            {
                from: path.resolve(__dirname, 'src/assets/img/'),
                to: path.resolve(__dirname, 'dist/assets/img')
            }
        ]),
        new MiniCssExtractPlugin({
            filename: 'bundle.css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            // '@babel/preset-react' Раскомментировать и установить зависимость, если хотите использовать React
                        ]
                    }
                }
            },
            {
                test: /\.(s[ac]ss)$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: isDev,
                        reloadAll: true
                    }
                }, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|webp)$/,
                use: [
                    {
                        loader: 'file-loader',
                    }
                ],

            },
            {
                test: /\.(ttf|woff|woff2|eot|)$/,
                use: ['file-loader']
            },
        ]
    }
};
