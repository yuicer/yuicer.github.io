---
title: vue小技巧
categories:
  - 尺工
  - 杂乱
  - 叹言
comments: false
date: 2017-05-02 11:23:44
---
<p></p>
<!-- more -->
## 记录一些在vue中的小技巧

1. keep-alive
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