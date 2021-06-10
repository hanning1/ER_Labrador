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
		hot: true, //在devServer中增加hot字段
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
	// entry: ["./src/index.js", "./src/dev.js"], //在entry字段中添加触发文件配置

	// entry: {
	// 	hot: "webpack/hot/dev-server",
	// 	index: path.resolve(__dirname, "./src/index.js"),
	// },
	entry: {
		index: path.join(__dirname, "./src/index.js"),
	},
	// devtool: "inline-source-map",
	output: {
		// 输出路径
		// __dirname nodejs的变量，代表当前文件的目录绝对路径
		path: path.join(__dirname + "/dist"),
		// 输出文件名
		filename: "[name].bundle.min.js",
		chunkFilename: "[name].[chunkhash:4].child.js",
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)?$/, // jsx文件的正则
				exclude: /node_modules/, // 排除 node_modules 文件夹
				use: {
					// loader 是 babel
					loader: "babel-loader",
					options: {
						// babel 转义的配置选项
						babelrc: false,
						presets: [
							// 添加 preset-react
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
				// 写正则表达式，匹配哪些文件
				test: /\.css$/,
				// 使用哪些loader进行处理
				use: [
					// use数组中loader执行顺序：从右到左，从下到上 依次执行
					// 创建style标签，将js中的样式资源插入进去，添加到head中生效
					"style-loader",
					// 将css文件变成commonJS模块加载到js中，里面内容是样式字符串
					"css-loader",
					"resolve-url-loader",
				],
			},
			{
				test: /\.less$/,
				use: [
					"style-loader",
					"css-loader",
					// 将less文件变成css文件
					// 需要下载 less-loader和less
					"less-loader",
				],
			},
			{
				// test: /\.(jpg|png|gif|svg|jpeg)?$/,
				test: /\.(gif|jpg|png|woff|svg|eot|ttf)$/,
				use: [
					"url-loader?limit=8192&name=ui/[name].[hash].[ext]!extract-loader!file-loader",
				],
			},
		],
	},
	plugins: [
		// new CleanWebpackPlugin(),
		// new BundleAnalyzerPlugin(),
		// plugins中增加下面内容，实例化热加载插件
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
	// 将 jsx 添加到默认扩展名中，省略 jsx
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
