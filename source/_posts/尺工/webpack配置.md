---
title: webpack配置
categories:
  - 尺工
 
date: 2017-02-04 17:11:35
---
<p></p>
<!-- more -->
## 前言
webpack 主要是用来做模块管理，但是到了现在，功能变的越来越强大，前端真是隔一两年大换血一次，感觉像什么 gulp grunt bower Browserify 到现在都被 npm + webpack 给挤下来了。
对于一个大点的项目，都会分开发环境，测试环境，生产环境。解决不同环境的问题，并要做到自动化就需要用到 npm + webpack
npm 需要 node 环境，webpack 是一个包管理，直接从npm上下载。

## 项目结构
最简单的结构，
在 webpack-demo 目录下
**
—app
——main.js
——greeter.js
——main.css
—src
——bundle.js
—index.html
—package.json
—webpack.config.js
+node_modules
**

app 中的是开发写的内容，src 是生成的静态内容，放在服务器上，webpack.config.js 是 webpack 配置文件，package.json 是安装包依赖。node_modules是依赖包，main.js 入口文件，bundle.js 打包好的出口文件，
## package.json
创建 package.json 文件
在项目里打开命令行后输入 npm init 会询问你一些问题，【可以一路回车】然后创建 package.json 文件
```
{
  "name": "webpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "directories": {
    "test": "test"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}

```
 然后做一些修改改为下面这个样子
```
 {
	"name": "webpack",
	"version": "1.0.0",
	"description": "",
	"scripts": {
		"dev": "cross-env NODE_ENV=development webpack-dev-server --open --inline --hot",
		"build": "cross-env NODE_ENV=production webpack --progress --hide-modules"
	},
	"author": "",
	"license": "ISC",
	"devDependencies": {
		"babel-core": "^6.0.0",
		"babel-loader": "^6.0.0",
		"babel-preset-es2015": "^6.0.0",
		"cross-env": "^3.0.0",
		"css-loader": "^0.25.0",
		"extract-text-webpack-plugin": "^2.0.0-rc.3",
		"style-loader": "^0.13.1",
		"url-loader": "^0.5.7",
		"webpack": "^2.2.0-beta.25",
		"webpack-dev-server": "^2.1.0-beta.9"
	}
}
```
cross-env 使不同系统都可以设置 node 的 process.env 环境变量。[cross-env](http://npm.taobao.org/package/cross-env)
其中 scripts 中写了2条命令分别对应 npm run dev 和 npm run build ,这里就要提到 npm 的脚本命令了
### npm 脚本命令
npm 允许在 package.json 文件中，定义 scripts 命令，如
```
"scripts": {
	"build":　"node server.js"
}
```
npm run build 等同于 node server.js.
npm 还有一个特性，它可以不加路径直接使用 node_modules/bin 下的所有脚本
比如 `"build": "./node_modules/.bin/webpack-dev-server"` 等于 `"build": "webpack-dev-server"`
原理：每当执行 npm run * 时，都会生成一个 shell ，然后去执行

接着上面的例子
cross-env 是使在不同系统中都可以代码设置 node 环境变量 NODE_ENV 。它分为开发环境和生产环境，在代码中可根据判断 process.env.NODE_ENV 的值去做不同的操作
dev 会去执行 webpack-dev-server ，它的作用是去开启一个本地服务器，--open 是运行完后直接打开网页，--inline 是实时监测修改并自动刷新 --hot 是热模块替换（hmr）
build 会去执行 webpack ，它的作用是去打包生成静态文件，--progress 是显示打包进度
另外 webpack 会将 es6 的 import export 自动解析成 es5，但是如果想用更多的 es6 语法，需要使用 babel-loader 加载器去加载解析 js
## webpack.config.js
webpack 的主要配置文件
```
var path = require("path")		//node模块，路径解析
var webpack = require("webpack")	
var ExtractTextPlugin = require("extract-text-webpack-plugin")	//单独分离出css，需安装

module.exports = {
	entry: __dirname + "/app/main.js", //打包入口,__dirname 为项目根目录路径
	output: {							//打包出口
		filename: "bundle.js"			//打包文件名
		publicPath: "/publica/",		//资源路径
		path: __dirname + "/public",	//打包文件位置
	},
	devtool: "eval-source-map", //为了调试方便，将编译文件与源文件相对应，开了之后文件会变成几MB，只在开发中使用
	module: {					//强大的加载器
		rules: [
			{
				test: /\.js$/,				//js加载器，
				loader: "babel-loader",		//babel-loader可以使js使用es6，等新特性
				query: {
					presets: ["es2015"]		//babel备注选项。
				}		//项目大，配置多的时候会把这一项分离出去，会在项目的根目录中多出一个 .babelrc 文件
		},{
				test: /\.css$/,		//css加载器
				//一种写法
				//loader: "style-loader!css-loader" 	//从右向左执行，css-loader遍历css文件，style-loader生成style标签
				//	另一种写法		
				//	use: [{
				//		loader: "style-loader"
				//	}, {
				//		loader: "css-loader"
				//	}]
				//运用插件将 css 从 bundle.js 分离为单独的css
				use: ExtractTextPlugin.extract({
						fallback: "style-loader",
						use: "css-loader"
					})
		}, {
				test: /\.(png|jpg|gif|svg)$/,	//文件资源加载器
				loader: "url-loader",
				query: {
					name: 'img/[name].[hash:7].[ext]',
					limit: 10000		//小于1MB的会压缩成base64格式
				}
		}
				]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'build.min.css',
			allChunks: true,
		}), 
	],
	devServer: {
		noInfo: true,
	}，
	performance: {
		hints: false		//性能评估，给定一个超过250kb的js资源，false不显示，waring给出警告，error给出报错
	}
}
if (process.env.NODE_ENV === 'production') {	//生产环境
	module.exports.devtool = '#source-map'
		// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'		//赋值 node 全局变量
			}
		}),
    new webpack.optimize.UglifyJsPlugin({		//压缩
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
    new webpack.LoaderOptionsPlugin({		//webpack2的options选项不能是全局/共享的（比如之前说到的 .babelrc）
			minimize: true					//这个插件是用来过度的。以后可能会去掉
		})
  ])
}
```
## 简单的使用例子
全部在一个目录下，共4个文件
greeter.js
```
module.exports = function () {
	...
}
```
main.js
```
import greet from "./greeter"
```
webpack.config.js
```
module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  }
}
```
index.html 
命令行输入 webpack 进行打包
加载打包完成后的 bundle.js 
```
<html>
  <head>
    ...
  </head>
  <body>
    ...
    <script src="bundle.js"></script>
  </body>
</html>
```

## 参考
[webpack官网](https://webpack.js.org/)
[入门Webpack，看这篇就够了](http://blog.csdn.net/kun5706947/article/details/52596766)
[webpack-howto](https://github.com/petehunt/webpack-howto)
[vue-loader](http://vue-loader.vuejs.org/en/)
[webpack--更优秀的打包管理工具](http://jixianqianduan.com/frontend-build/2015/04/01/webpack-tool.html)




