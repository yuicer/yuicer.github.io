---
title: vue使用
categories:
  - 尺工
comments: false
date: 2017-01-05 12:03:20
---
<p></p>
<!-- more -->
## 开始
首先安装vue 脚手架工具
` npm install -g vue-cli`
然后开始初始化安装
`vue init <template-name> <project-name>`
举例
`vue init webpack my-project`
这个例子将拉取**[webpack模板](https://github.com/vuejs-templates/webpack)**,然后进行一些提示，之后在**./my-project/**建立项目
模板一共有这5种，[详情请看](https://github.com/vuejs/vue-cli)
> webpack   
webpack-simple  
browserify  
browserify-simple 
simple

这个脚手架自带热加载，单元测试，打包压缩等一大推功能，根据自己情况去选择，可以一路回车下来，遇到y/n全选有n
然后安装依赖，这个过程可能时间比较长。
`npm install`
安装完成后就可以启动了，自带几个脚本命令
`npm run dev`
这是个带热加载，实时更新的本地服务器，
`npm run build`
生成压缩混淆的最终静态文件。

## 问题
### 1.vue 页面加载的时候有可能出现{{expression}}这种绑定的表达式没有被vue解析。
在根节点上加上 v-cloak
```
	<div id="app" v-cloak>
```
css样式添加
```
[v-cloak] {
	display: none;
}
```