//webpackage.config.js

const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack"); //增加导入webpack

module.exports = {
	mode: "development",
	devtool: "cheap-module-source-map",
	devServer: {
		hot: true, //在devServer中增加hot字段
		contentBase: path.join(__dirname, "./src/"),
		publicPath: "/",
		host: "127.0.0.1",
		port: 3000,
		stats: {
			colors: true,
		},
	},
	entry: ["./src/index.js", "./src/dev.js"], //在entry字段中添加触发文件配置
	// 将 jsx 添加到默认扩展名中，省略 jsx
	resolve: {
		extensions: [".wasm", ".mjs", ".js", ".json", ".jsx"],
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/, // jsx文件的正则
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
						cacheDirectory: true,
					},
				},
			},
		],
	},
	plugins: [
		// plugins中增加下面内容，实例化热加载插件
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebPackPlugin({
			template: "public/index.html",
			filename: "index.html",
			inject: true,
		}),
	],
};

		// "start": "webpack serve --mode development --open",
