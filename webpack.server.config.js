var webpack = require('webpack');

var path = require('path');

module.exports = {

	entry: './src/server.jsx',

	output: {
		path: path.join(__dirname, './build/'),
		filename: 'server.js',
		publicPath: './src',
		libraryTarget: 'commonjs2'
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				// This has effect on the react lib size
				NODE_ENV: JSON.stringify('production')
			}
		})
	],

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
						// https://github.com/babel/babel-loader#options
						cacheDirectory: true,
						presets: ['es2015', 'react']
				}
			}
		]
	},

	resolve: {
		extensions: ['', '.js', '.jsx']
	},

	target: 'node'
};
