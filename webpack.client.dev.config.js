var webpack = require('webpack');

var path = require('path');

module.exports = {

	// Efficiently evaluate modules with source maps
	devtool: 'eval',

	entry: [
		'webpack-dev-server/client?http://localhost:9090',
		'webpack/hot/only-dev-server',
		'./src/app.jsx'
	],

	output: {
		path: path.join(__dirname, 'build/'),
		filename: 'app.js',
		publicPath: 'http://localhost:9090/build/'
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'react-hot!babel-loader?' + JSON.stringify({
						// https://github.com/babel/babel-loader#options
						cacheDirectory: true,
						presets: ['es2015', 'react']
				})
			}
		]
	},

	resolve: {
		extensions: ['', '.js', '.jsx']
	}
};
