
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');

var env = process.env.NODE_ENV || 'development';
/*
var plugins = [
new HtmlWebpackPlugin({
        template: 'src/index.html',
        filename: 'index.html',
        inject: 'body',
    })
];

console.log('NODE_ENV:', env);

*/

let plugins = [];
console.log('NODE_ENV:', env);

if (env === 'production') {
	plugins.push(
	    new UglifyJsPlugin(),
	    new OptimizeJsPlugin({
	      sourceMap: false
	    })
	);
}

plugins.push(
	new HtmlWebpackPlugin({
		template: 'client/index.html',
		filename: 'index.html',
		inject: 'body'
	})
);

module.exports = {
	entry: (env !== 'production' ? [
		'react-hot-loader/patch',
		'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        ] : []).concat(['./client/index.js']),
	output: {
		filename: './bundle.js',
		path: path.resolve(__dirname, 'public')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: [
					{loader: 'style-loader'},
					{
						loader: "css-loader",
						options: {
							modules: true
						}
					}
				]
			}
		]
	},
	plugins
};



