const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const AutoDllPlugin = require('autodll-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

var webpack = require('webpack')

module.exports = {
    entry: path.join(__dirname, './src/main.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        // eslint-disable-next-line new-cap
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html'
        }),
        new AutoDllPlugin({
            // will inject the DLL bundle to index.html
            // default false
            inject: true,
            debug: false,
            filename: '[name]_[hash].js',
            path: 'static',
            entry: {
                // [name] = vue, 在这里会将entry里的每个item(vue,jquery)都打包成一个js
                vue: [
                    'vue',
                    'vue-router'
                ]
                // [name] = jquery
                // jquery: [
                //   'jquery',
                //   'jquery-from'
                // ]
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[chunkhash:8].css',
            chunkFilename: 'static/css/[id].css'
        }),
        new VueLoaderPlugin(), // 高版本的vue-loader需要配置VueLoaderPlugin
        new webpack.DefinePlugin({ // 配置浏览器中vue的调试工具
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new webpack.optimize.SplitChunksPlugin()
    ],
    module: {
        rules: [
            { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
            { test: /\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'] },
            { test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] },
            { test: /\.(jpg|gif|png|bmp|jpeg)$/, use: 'url-loader?limit=8192&name=static/images/[hash:8]-[name].[ext]' },
            // limit给定的值是图片的大小，单位是byte，如果我们引用的图片大于或等于给定的limit值，则不会被转为base64格式的字符串，如果图片小于给定的limit值，则会被转为base64格式的字符串
            { test: /\.(ttf|woff|woff2|svg|eot)$/, use: 'url-loader?name=static/font/[hash:8]-[name].[ext]' },
            // 处理字体文件的配置项
            { test: /\.js$/, use: ['babel-loader', 'eslint-loader'], exclude: /node_modules/ },
            // 处理.vue文件的loader
            { test: /\.vue$/, use: ['vue-loader', 'eslint-loader'], exclude: /node_modules/ }
        ]
    },
    // 修改vue被导入时的包的路径
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    }
}
