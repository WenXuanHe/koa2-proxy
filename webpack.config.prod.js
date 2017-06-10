var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        index:path.resolve(__dirname, "public/javascripts/src/Thumb.js"),
        vendors:[
            "axios"
        ]
    },
    output: {
        path: path.resolve(__dirname, 'public/javascripts/dist/'),
        filename: "[name].[hash:8].js",
        sourceMapFilename: '[file].map',
        publicPath:'/javascripts/dist/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [path.resolve(__dirname, 'public/javascripts/src')],
                exclude: /node_modules/,
                query: {
                    "presets":
                    [
                        "es2015",
                        "stage-0"
                    ],
                    plugins: ['transform-runtime']
                }
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=50000&name=[path][name].[ext]'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(['css-loader']) //postcss-loader  自动补齐前缀
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'postcss-loader', 'sass-loader'])
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.scss'],
        alias: {
          $css: path.resolve(__dirname, 'public/stylesheets'),
        }
    },
    plugins:[
        // 压缩配置
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        }),
        new HtmlWebpackPlugin({
            hash:false,
            filename: path.resolve(__dirname, 'views/index.html'),//最终生成的html文件
            template: path.resolve(__dirname, 'views/template/index.html'),
            chunks:['vendors', 'index'], //入口文件所依赖的js文件
            inject:'body' //js文件插入到body最后一行
        }),
        new ExtractTextPlugin("styles/[name].[hash:8].css"),
        new CleanWebpackPlugin(
            [
            'public/javascripts/dist/*.js',
            'public/javascripts/dist/*.map',
            'public/javascripts/dist/styles/*.css',
            'public/javascripts/dist/styles/*.map'],　 //匹配删除的文件
            {
                root: __dirname,       　　　　　　　　　　//根目录
                verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
                dry:      false        　　　　　　　　　　//启用删除文件
            }
        )
    ],
    devtool: 'source-map'
}
