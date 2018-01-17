---
title: vue小技巧
categories:
  - 尺工
 
date: 2018-01-15 11:23:44
---
<p></p>
<!-- more -->

## 设置请求域名
var url = Vue.config.devtools ? '//test.xxx.com/api' : '/api'
Vue.http.options.root = url

## proxyTable
解决跨域，会将 请求 localhost 的请求转发
```
proxyTable: {
	'/api': {
		target: 'http://www.xxx.com/some/api',
		changeOrigin: true,
		pathRewrite: {
			'^/api': ''
		}
	}
}
...
$http.get('api')
```
##  webpack anaylzer
可以用來检查哪些文件过大可以优化
`npm install --save-dev webpack-bundle-analyzer`
```
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
 
// ...
plugins: [new BundleAnalyzerPlugin()]
```

## dom中执行方法
```
<div v-if="isF">f()<div>
```
这种写法很取巧，一般是监听$store.state或者其他数据的时候这么写，其实不正规，还是应该用$store.actions或者mutations来对数据进行监测。

## v-for 数据显示开关
当有一大推数据且需要对每一条数据设置一个开关时可以这么做
在当前组件中
```
 data(){
 	return{
		switch: new Array(size)
	}
 },
 methods:{
 	change_switch(index){
		this.switch.splice(index,1,this.switch[index])
	}
 }
```
这样做就可以比较方便的为每一条数据设置一个开关。
唯一不足是 size 可能不知道，就只能设置一个比较大的数。且开销比直接设置 = [] 大

## 监听vue数据
在 dom 中写三元表达式判断
```
	$store.state.some == any ? func() : else()
```
这样就可以知道 vuex 数据更改然后进行操作

## vue-resource root
vue-resource 中可以设置 url 的公共部分，方便测试转正式
在 main.js 中
```
	Vue.http.options.root = url;
	Vue.http.options.emulateJSON = true;
```
之后可以通过 vue 实例(vm)来访问 
vm.$http.options.root

## 数据渲染
vue 的数据绑定渲染对数组和对象的检测是浅复制的检测
所以当更改数组或对象的时候需要用到 js 方法 splice push 等
