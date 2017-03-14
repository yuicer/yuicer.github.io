---
title: require_import
categories:
  - 尺工
comments: false
date: 2017-02-27 17:23:15
---
<p></p>
<!-- more -->
## 前言
最开始接触 webpack 的时候，看到里面用到 import require ，实在是没搞懂这2个有什么区别，一直到今天，又查了些资料，整理如下
## import
这是 es6 提出来的规范，import export 配套使用。
例子
```
//c.js
var c = 3;
export default c
//a.js
import c from "./c.js"
console.log(c)	//3
```
对于 import ，也可以去引用没有写 export 的文件，比如把上面的例子去掉`export default c`，这样的话引入的是一个对象，在引入的同时就会去执行这整个文件。
另外 module.exports 和 export 是不一样的的，前者是 node 中模块的方法，简写为 exports 。后者是 es6 的语法。
在 node 里面的模块是使用 exports 和 require，在 es6 里面是 export 和 import
default 个人理解在这里是说导出的是默认模块【唯一一个】所以 export import 都不用加{} ，而且在 import 可以重新取一个名字
如果不用的话如下
```
var c = 3;
export  {c}
//a.js
import {c} from "./c.js"
console.log(c)	//3

```
## require
require 是 commonjs 里面的，所有的 node 模块都为 commonjs 格式，它并不是一个规范。
require 主要是用来加载文件，不写相对路径，加载的就是内置模块，node_module 中的，加了相对路径就是自己写的文件。
require 后会去执行这个文件。

## 总结
这两者之间有共同的部分，但是 export import 更倾向于自己去定义要导出的模块。require 倾向于去加载文件
两者都是为了去模块化代码。
