//webpackage.config.js

const webpack = require("webpack"); //增加导入webpack
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
	require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
	mode: "development",
	// devtool: "cheap-module-source-map",
	devServer: {
		hot: true, //import Hot to the dev server
		inline: true,
		contentBase: path.join(__dirname, "./dist"),
		publicPath: "/",
		// host: "127.0.0.1",
		https: true,
		host: "uom.eratos",
		disableHostCheck: true,
		port: 3000,
		stats: {
			colors: true,
		},
		historyApiFallback: true,
	},
	entry: {
		index: path.join(__dirname, "./src/index.js"),
	},
	// devtool: "inline-source-map",
	output: {
		path: path.join(__dirname + "/dist"),
		filename: "[name].bundle.min.js",
		chunkFilename: "[name].[chunkhash:4].child.js",
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						babelrc: false,
						presets: [
							require.resolve("@babel/preset-react"),
							[
								require.resolve("@babel/preset-env"),
								{ modules: false },
							],
						],
						plugins: ["@babel/plugin-proposal-class-properties"],
						cacheDirectory: true,
					},
				},
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader", "resolve-url-loader"],
			},
			{
				test: /\.less$/,
				use: ["style-loader", "css-loader", "less-loader"],
			},
			{
				test: /\.(gif|jpg|png|woff|svg|eot|ttf)$/,
				use: [
					"url-loader?limit=8192&name=ui/[name].[hash].[ext]!extract-loader!file-loader",
				],
			},
		],
	},
	plugins: [
		// new BundleAnalyzerPlugin(),
		// new webpack.HotModuleReplacementPlugin(),
		new HtmlWebPackPlugin({
			template: "public/index.html",
			filename: "index.html",
			inject: true,
		}),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(
				process.env.NODE_ENV || "production"
			),
		}),
		new UglifyJSPlugin({
			uglifyOptions: {
				ie8: false,
				output: {
					comments: false,
					beautify: false,
				},
				mangle: {
					keep_fnames: true,
				},
				compress: {
					drop_console: true,
				},
				warnings: false,
			},
		}),
	],
	resolve: {
		extensions: [".wasm", ".mjs", ".js", ".json", ".jsx"],
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commonjs: {
					chunks: "initial",
					minChunks: 2,
					maxInitialRequests: 5,
					minSize: 0,
				},
				vendor: {
					test: /node_modules/,
					chunks: "initial",
					name: "vendor",
					priority: 10,
					enforce: true,
				},
			},
		},
		runtimeChunk: true,
	},
};
