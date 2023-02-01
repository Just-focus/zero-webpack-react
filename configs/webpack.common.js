// 基础配置

const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');
const paths = require('./paths');
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
	entry: {
		app: paths.resolvePath('src/app.tsx'),
	},
	output: {
		filename: '[name].[contenthash].js',
		path: paths.resolvePath('dist'),
		publicPath: isDevelopment ? '/' : '/',
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
						},
					},
					{
						loader: 'ts-loader',
						options: {
							getCustomTransformers: () => ({
								before: [isDevelopment && ReactRefreshTypeScript()].filter(Boolean),
							}),
							transpileOnly: true,
						},
					},
				],
			},
			{
				test: /\.(scss|css)$/,
				use: [
					// for development use MiniCssExtractPlugin to compile styles as separate files, for development add them directly into the HTML
					isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					{
						loader: 'sass-loader',
						options: {
							additionalData: `@import "@zerico/react/dist/styles/variables.scss";`,
						},
					},
				],
			},
			{
				test: /\.(eot|woff|otf|svg|ttf|woff2|appcache|mp3|mp4|pdf)(\?|$)/,
				include: paths.resolvePath('src'),
				type: 'asset/resource',
			},
			{
				test: /\.(png|jpg|jpeg|gif)(\?|$)/i,
				include: paths.resolvePath('src'),
				type: 'asset',
			},
			{
				test: /\.wasm$/,
				include: paths.resolvePath('src'),
				type: 'webassembly/experimental',
			},
		],
	},
	plugins: [
		new ESLintPlugin({
			context: paths.resolvePath('src'),
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
			chunkFilename: '[id].css',
		}),
		new HtmlWebpackPlugin({
			template: paths.resolvePath('src/index.html'),
			inject: true,
		}),
		new ForkTsCheckWebpackPlugin(),
		isDevelopment && new ReactRefreshWebpackPlugin(),
	].filter(Boolean),
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx', '.scss', '.css', '.wasm'], //后缀名自动补全
		alias: {
			'@': paths.resolvePath('src'),
		},
	},
};
