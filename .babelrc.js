module.exports = api => {
	// This caches the Babel config
	api.cache.using(() => process.env.NODE_ENV);

	return {
		presets: [
			'@babel/preset-env',
			'@babel/preset-typescript',
			// Enable development transform of React with new automatic runtime
			[
				'@babel/preset-react',
				{
					development: !api.env('production'),
					runtime: 'automatic',
				},
			],
		],
		plugins: [
			'@babel/plugin-proposal-class-properties',
			[
				'import',
				{
					libraryName: '@zerico/react',
					libraryDirectory: 'dist/esm',
					style: true,
					camel2DashComponentName: false,
				},
				'@zerico/react',
			],
			!api.env('production') && 'react-refresh/babel',
		].filter(Boolean),
	};
};
