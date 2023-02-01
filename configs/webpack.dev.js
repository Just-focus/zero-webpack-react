const ip = require('ip');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const host = ip.address();

module.exports = merge(common, {
	mode: 'development',
	devtool: 'eval-source-map',
	plugins: [
		new webpack.EvalSourceMapDevToolPlugin({
			exclude: /node_modules/,
			module: true,
			columns: false,
		}),
	],
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
	devServer: {
		host,
		port: 8080,
		hot: true,
		liveReload: false,
		open: true,
		client: {
			logging: 'info',
			progress: true,
			reconnect: 5,
			overlay: {
				errors: true,
				warnings: false,
			},
		},
		historyApiFallback: true, // 路由替换
		proxy: {
			'/appapi': {
				target: 'http://activity-bigboy-sit.bigboy.club/',
				changeOrigin: true,
			},
		},
	},
});
