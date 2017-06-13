var path = require("path");
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var htmlWebpackPlugin = new HtmlWebpackPlugin({
    hash:false,//path.resolve(__dirname, 'views/template/index.html')
    filename: path.resolve(__dirname, 'views/index.html'),//最终生成的html文件
    template: path.resolve(__dirname, 'views/template/index.html'),
    chunks:['common', 'index'], //入口文件所依赖的js文件
    inject:'define' //js文件插入到body最后一行
});

htmlWebpackPlugin = require('./views/template/injectAssetsIntoHtml')(htmlWebpackPlugin);

module.exports = {
    entry: {
        index:path.resolve(__dirname, "public/src/javascripts/Thumb.js"),
    },
    output: {
        path: path.resolve(__dirname, 'public/dist/'),
        filename: "[name].js",
        sourceMapFilename: '[file].map',
        publicPath:'/dist/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [path.resolve(__dirname, 'public/src/javascripts')],
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
          $css: path.resolve(__dirname, 'public/src/stylesheets'),
        }
    },
    plugins:[
        new ExtractTextPlugin("styles/[name].css"),
        htmlWebpackPlugin,
        new CleanWebpackPlugin(
            [ 'public/dist/*.*'],　 //匹配删除的文件
            {
                root: __dirname,       　　　　　　　　　　//根目录
                verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
                dry:      false        　　　　　　　　　　//启用删除文件
            }
        ),
        // 通用代码独立文件插件
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'common.js',
            minChunks: 2
        })
    ],
    devtool: 'source-map'
}
