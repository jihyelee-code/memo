const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
// const { compile } = require('ejs');
const { Compiler } = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const devMode = process.env.NODE_ENV.trim() !== "production";

module.exports = {
    mode: devMode ? "development" : "production",
    optimization:{
        minimizer: [
            new TerserPlugin({
                minify: TerserPlugin.uglifyJsMinify,
                extractComments: true,
                terserOptions: {
                    compress: {
                        pure_funcs: ['console.log']
                    }
                }
            }),
        ],
    },
    entry: {
        index: [
            './src/js/app.js',
            './src/scss/bootstrap.scss',
        ]
    },
    devtool: 'inline-source-map',
    plugins: [
        new CleanWebpackPlugin(),
        // new CopyPlugin({
        //     patterns: [
        //         { from: "./src/js/languages", to: "./languages" }
        //     ]
        // }),
        new HtmlWebpackPlugin({
            title: 'Memo',
            favicon: 'favicon.ico',
            inject: 'body',
            scriptLoading: 'blocking',
            showErrors: true,
            template: path.join(__dirname, './src/html/index.html'),
            filename: path.join(__dirname, './docs/index.html'),
            // base: `http://${host}:${port}/`,
            chunks: ["index"],
            // minify: true,
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css',
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_DEBUG': JSON.stringify(process.env.NODE_DEBUG)
        })
    ],
    output: {
        path: path.join(__dirname, './docs'),
        publicPath: "./",
        filename: 'js/[name].bundle.js',
    },
    module: {
        //an array of rules which are matched to requests when modules are created.
        //These rules can modify how the module is created.
        //They can apply loaders to the module, or modify the parser.
        rules: [
            {
                test: /\.html$/,
                use:[
                    {
                        loader: 'html-loader',
                        options: {
                            preprocessor: (content, loaderContext) => 
                            content.replace(
                                /<include src="(.+)"\s*\/?>(?:<\/include>)?/gi,
                                (m, src) => {
                                  const filePath = path.resolve(loaderContext.context, src)
                                  loaderContext.dependency(filePath)
                                  return fs.readFileSync(filePath, 'utf8')
                                }
                            ),
                        }
                    },
                    // {
                    //     loader: "posthtml-loader",
                    //     options: {
                    //         plugins: [
                    //             require('posthtml-css-modules')('./tmp/module-data.json')
                    //         ]
                    //     }
                    // }
                ],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: { 
                            // modules: true, 
                            importLoaders: 1,
                        }
                    },
                    "postcss-loader",
                    "sass-loader",
                ],
            },
         
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env', 
                        {
                            plugins: ["@babel/plugin-transform-runtime"],
                        },
                        "@babel/preset-typescript"
                    ]
                },
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: "image/[name][ext]"
                }
            },
            {
                test: /\.(woff(2)?|ttf)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: "image"
                    }
                  }
                ]
            }
        ]
    },
    resolve: {
        // tell webpack what directories should be searched when resolving modules
        modules: [
            path.resolve(__dirname, 'node_modules'),
            path.join(__dirname, './src/js'),
        ], 
        extensions: ['.ts', '.js'],
        fallback: {
            "stream": require.resolve("stream-browserify"),
            "assert": require.resolve("assert/")
        },
    },
    devServer: devMode ? {
        server: "https",
        static: path.join(__dirname, 'docs/'),
        compress: true,
        port: 1004,
        host: '127.0.0.1', 
        open: true,
        devMiddleware: {
            writeToDisk: true,
        },
        liveReload: true,
        hot: true,
        historyApiFallback:{
            rewrites: [
                { from: /^\/$/, to: '/index.html'}
            ]
        }
    } : undefined,
};

