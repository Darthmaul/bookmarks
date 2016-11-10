var webpack = require('webpack');

module.exports = {
	entry: './app/index.jsx',
	output: {
		filename: 'build/bookmarks.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'stage-0', 'react']
				}
			},
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass']
			}
		]
	}
};