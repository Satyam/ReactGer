var webpack = require('webpack');

var path = require('path');

module.exports = {

	entry: './src/app.jsx',

	output: {
		path: path.join(__dirname, 'build/'),
		filename: 'app.js',
		publicPath: './src'
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				// This has effect on the react lib size
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	],

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},

	resolve: {
		extensions: ['', '.js', '.jsx']
	}
};
