const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const common = require('./webpack.common');

module.exports = merge(common, {
	mode: 'production',
	devtool: false,
	stats: {
		children: false, // 不输出子模块的打包信息
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				parallel: true, // 多线程并行构建
				terserOptions: {
					// https://github.com/terser/terser#minify-options
					compress: {
						warnings: false, // 删除无用代码时是否给出警告
						drop_debugger: true, // 删除所有的debugger
						// drop_console: true, // 删除所有的console.*
						pure_funcs: ['console.log'], // 删除所有的console.log
					},
				},
			}),
		],
		splitChunks: {
			chunks: 'all', // 共有三个值可选：initial(初始模块)、async(按需加载模块)和all(全部模块)
			minSize: 30000, // 模块超过30k自动被抽离成公共模块
			minChunks: 1, // 模块被引用>=1次，便分割
			name: false, // 默认由模块名+hash命名，名称相同时多个模块将合并为1个，可以设置为function
			automaticNameDelimiter: '~', // 命名分隔符
			cacheGroups: {
				// default会将自定义代码部分默认打成一个包，即src里的js代码
				default: {
					// 模块缓存规则，设置为false，默认缓存组将禁用
					minChunks: 2, // 模块被引用>=2次，拆分至vendors公共模块
					priority: -20, // 优先级，优先级越高则越先拆包，即对于同一个依赖包，该依赖包会优先被打包进优先级高的包里
					reuseExistingChunk: true, // 默认使用已有的模块
				},
				// vendor将node_modules文件夹下的内容都统一打包到wendor中，因为一般第三方插件的内容不会轻易改变
				// 此处也是拆包的重点区域，因为node_module里的内容太多，打出来的包会很大，在首页一次加载会影响加载速度，所以会将一些不常用且非必须的包拆出来，
				// 如echart等，后面通过动态加载的方式引进来
				vendor: {
					test: /[\\/]node_modules[\\/]/, // 匹配的规则，可以为文件夹，也可以为具体的文件，如 指定文件夹/[\\/]node_modules[\\/]/,待指定后缀文件 /\.(css|less)$/,具体文件/base.less|index.less/
					name: 'vendor', // 此处的name,即为打包后包的name
					priority: -10, // 确定模块打入的优先级
					reuseExistingChunk: true, // 使用复用已经存在的模块
					enforce: true,
				},
				styles: {
					test: /\.css$/,
					name: 'styles',
					priority: 10, // 确定模块打入的优先级
					chunks: 'all',
					enforce: true,
				},
			},
		},
	},
	// plugins: [new BundleAnalyzerPlugin()],
});
