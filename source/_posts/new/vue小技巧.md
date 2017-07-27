---
title: vue小技巧
categories:
  - 尺工
comments: false
date: 2017-05-02 11:23:44
---
<p></p>
<!-- more -->

## keep-alive
保存组件的状态在路由重新导航过来的时候不进行重新渲染。
在 vue 2.1 的时候新增 include exclude 2个属性，用来控制哪些组件是渲染或不渲染的
名字属性需要是在组件内部中注册 name 属性
```
<transition name="fade" mode="out-in">
    <keep-alive exclude="game">
       	<router-view></router-view>
	</keep-alive>
</transition>
```
### 补充
```
<keep-alive exclude="start,fight">
    <router-view></router-view>
</keep-alive>
```
在使用这种结构的时候，只有 exclude 起作用，如果换成 include ，keep-alive 就完全不生效
```
<keep-alive include="start,fight">
    <component :is = "view"></component>
</keep-alive>
```
但是使用这种结构又起作用。。。。。。。有空再多测试下这个

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
