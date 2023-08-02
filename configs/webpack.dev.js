const ip = require('ip');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const openBrowser = require('./openBrowser');

const host = ip.address();
const port = '8080';

const devConfig = merge(common, {
	mode: 'development',
	devtool: 'eval-cheap-module-source-map',
	type: 'memory',
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
});

const devServer = new WebpackDevServer(
	{
		host, // 地址
		port, // 端口
		open: false, // 是否自动打开，关闭
		setupExitSignals: true, // 允许在 SIGINT 和 SIGTERM 信号时关闭开发服务器和退出进程。
		compress: false, // gzip压缩,开发环境不开启,提升热更新速度
		hot: true, // 开启热更新
		liveReload: false,
		historyApiFallback: true, // 解决history路由404问题
		client: {
			logging: 'info',
			progress: true,
			reconnect: 5,
			overlay: {
				errors: true,
				warnings: false,
			},
		},
		proxy: {
			'/appapi': {
				target: 'http://activity-bigboy-sit.bigboy.club/',
				changeOrigin: true,
			},
		},
		headers: { 'Access-Control-Allow-Origin': '*' },
	},
	webpack(devConfig)
);

devServer.start().then(() => {
	// 启动界面
	openBrowser(`http://${host}:${port}`);
});
