var  webpack = require('webpack');
var path = require("path");
var ROOT_PATH = path.resolve(__dirname);

module.exports = {
	//这里填写配置项
	entry: './public/javascripts/src/Thumb.js',
	output: {
		path: path.resolve(ROOT_PATH, './public/javascripts/dist'),
		filename: "Thumb.js"
	},
	module: {
	    rules: [
	        {test: /\.js$/, loader: 'babel-loader'},
			{ test: /\.css$/, loader: "style!css" },
	    ]
  	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	    new webpack.LoaderOptionsPlugin({
	      options: {
	        loaders: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
					query:{
						presets:['es2015']
					}
				},
				{ test: /\.css$/, loader: "style!css" },
			]
	      }
	    })
	]

}
