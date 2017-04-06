---
title: vue文件引入
categories:
  - 尺工
comments: false
date: 2017-04-06 17:09:52
---
<p></p>
<!-- more -->
## 前言
这次讲以前的一个项目导入到 vue 组件中的时候出现了很多问题，以前的项目是典型的 js + css + html 这样，vue 组件是 vue-cli 搭建。

## 文件引入
在 webpack 中有 require 和 import 两种方法，可以看前一篇文章

### 引入全局插件
比如 tween jq three 等想要在每一个 vue 组件使用
1.在 index.html 下手动加 script 标签加载。
缺点，无法应用 webpack 的打包

2.在需要的地方使用 var name = require('./name')
比如`var THREE = require('../../../static/three.min.js')`
缺点，对于每一个 vue 组件，都需要去这样写，而且还要根据文件的路径去做更改，（或许可以用别名？）

3.绑定 vue 全局对象，
```
var jq = require(./jq)
Vue.prototype.jq = jq
```
缺点，写法麻烦，都得加 this.jq

4.修改 webpack 中的配置，暂缺

### 引入外部css
1.require('./css')
2.import './css'
3.在 style 标签下 @import './csss'，加 scoped="true" 也没办法用
这3种都不能固定作用域

4.
更改 style 标签的 src
```
<style scoped="true" src="./css/main.css">
```
这个可以确定作用域。

### 外部 js 获取 vue 对象
1.在 main.js 配置文件中将 vue 实例 export 出来，在外部 js 中 import 。