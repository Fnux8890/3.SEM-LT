const path = require('path');
const { SourceMapDevToolPlugin, ProvidePlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
module.exports = {
	target: 'node',
	mode: 'development',
	entry: {
		exercise: {
			import: './app/views/js/Exercises/exercise1.js',
		},
		navbar: path.resolve(__dirname, './app/views/js/Navbar/navbar.js'),
		login: path.resolve(__dirname, './app/views/js/login/login.js'),
		createAccount: path.resolve(
		error: path.resolve(__dirname, "./app/views/js/error.js"),
		modules: path.resolve(__dirname, './app/views/js/cards.js'),
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "app/views/dist/js"),
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.(s[ac]|c)ss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../',
						},
					},
					{
						loader: 'css-loader',
						options: {
							url: true,
						},
					},
					'sass-loader',
					'postcss-loader',
				],
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.js$/,
				enforce: 'pre',
				use: ['source-map-loader'],
			},
			{
				test: /\.(s[ac]|c)ss$/i,
				enforce: 'pre',
				use: ['source-map-loader'],
			},
			// {
			// 	test: /\.(svg|png|jpe?g|gif)$/,
			// 	use: {
			// 		loader: "file-loader",
			// 		options: {
			// 			name: "[name].[ext]",
			// 			outputPath: "img",
			// 			public: "../",
			// 		},
			// 	},
			// },
		],
	},
	optimization: {
		splitChunks: {
			chunks: 'async',
			minSize: 20000,
			minRemainingSize: 0,
			minChunks: 1,
			maxAsyncRequests: 30,
			maxInitialRequests: 30,
			enforceSizeThreshold: 50000,
			cacheGroups: {
				defaultVendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					reuseExistingChunk: true,
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
				},
				styles: {
					name: 'styles',
					type: 'css/mini-extract',
					chunks: 'all',
					minChunks: 2,
					enforce: true,
				},
			},
		},
		minimizer: [new CssMinimizerPlugin()],
		minimize: false,
	},
	plugins: [
		//new SourceMapDevToolPlugin({ filename: "[file].map" }),
		new ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
		}),
		new MiniCssExtractPlugin({
			filename: "../css/[name].css",
			chunkFilename: "[id].css",
		}),
	],
	//devtool: "source-map",
};
