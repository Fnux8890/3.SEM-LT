const path = require("path");
const {
	SourceMapDevToolPlugin,
	ProvidePlugin
} = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
	target: "node",
	mode: "development",
	entry: {
		exercise1: path.resolve(__dirname, "./app/views/js/Exercises/exercise1.js"),
		exercise2: path.resolve(__dirname, "./app/views/js/Exercises/exercise2.js"),
		exercise3: path.resolve(__dirname, "./app/views/js/Exercises/exercise3.js"),
		set1test: path.resolve(__dirname, "./app/views/js/Exercises/Set1Test.js"),
		navbar: path.resolve(__dirname, "./app/views/js/Navbar/navbar.js"),
		login: path.resolve(__dirname, "./app/views/js/login/login.js"),
		createAccount: path.resolve(
			__dirname,
			"app/views/js/login/createAccount.js"
		),
		error: path.resolve(__dirname, "./app/views/js/error.js"),
		modules: path.resolve(__dirname, "./app/views/js/moduleOverview.js"),
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "app/views/dist/js"),
		publicPath: "../",
		clean: true,
	},
	module: {
		rules: [{
				test: /\.(s[ac]|c)ss$/i,
				use: [{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: "/dist/js/",
						},
					},
					{
						loader: "css-loader",
						options: {
							url: true,
							sourceMap: true,
						},
					},
					"postcss-loader",
					{
						loader: "resolve-url-loader",
						options: {
							sourceMap: true,
						},
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
			{
				test: /\.js$/,
				enforce: "pre",
				use: ["source-map-loader"],
			},
			{
				test: /\.(s[ac]|c)ss$/i,
				enforce: "pre",
				use: ["source-map-loader"],
			},
			// {
			// 	test: /\.(svg|png|jpe?g|gif)$/,
			// 	use: {
			// 		loader: "url-loader",
			// 	},
			// },
			{
				test: /\.(svg|png|jpe?g|gif)$/,
				type: "asset/resource",
				// options: {
				// 	name: "[name].[ext]",
				// },
			},
		],
	},
	optimization: {
		splitChunks: {
			chunks: "async",
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
					name: "styles",
					type: "css/mini-extract",
					chunks: "all",
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
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery",
		}),
		new MiniCssExtractPlugin({
			filename: "../css/[name].css",
			chunkFilename: "[id].css",
		}),
	],
	//devtool: "source-map",
};