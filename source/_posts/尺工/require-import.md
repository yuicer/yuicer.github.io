---
title: require_import
categories:
  - 尺工
comments: false
date: 2017-04-6 17:53:15
---
<p></p>
<!-- more -->
## 前言
最开始接触 webpack 的时候，看到里面用到 import require ，实在是没搞懂这2个有什么区别，一直到今天，又查了些资料，整理如下
## import export
这是 es6 提出来的规范，import export 配套使用。
注意 exports , module.exports , module.require 不同，这些是 node 中的 api
### export [文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export)
命名导出
```
export { myFunction , varA}; // 导出一个函数声明和一个变量A
export const foo = Math.sqrt(2); // 导出一个常量
```
默认导出，一个脚本只有一个
```
export default myFunctionOrClass
```
### import [文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import)
对于命名导出
```
import {foo, bar} from "my-module";
```
对于默认导出，MyModule 可以更换为别的名字，因为只有一个导出。
```
import MyModule from "my-module";
```
整体导入,没有任何绑定，会去执行 my-module 这个 js 文件当作一个副环境
```
import "my-module"
```

## require
require 是 commonjs 规范里面的，node 采用了 commonjs 格式，而 webpack 是 node 格式。
require 主要是用来加载文件，不写相对路径，加载的就是内置模块（具体还不知道是在 webpack 中哪里设置的），node_module 中的，加了相对路径就是加载自己写的文件。
require 后会去执行这个文件。

## 总结
这两者之间有共同的部分，但是 export import 更倾向于自己去定义要导出的模块。require 倾向于去加载文件
两者都是为了去模块化代码。
