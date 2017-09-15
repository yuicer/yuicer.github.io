---
title: 服务器部署nuxt
categories:
  - 尺工
 
date: 2017-07-20 09:46:56
---
<p></p>
<!-- more -->

## 前言
nuxt.js 是一个基于 vue.js 的服务端渲染应用框架（集成了 vue webpack babel），主要注重于 ui 渲染，可生成静态站点，框架灵活。

## 安装
`vue init nuxt/exoress <project-name>`
对 express 比较熟悉，所以装这个模板
[文档](https://zh.nuxtjs.org/)

## nuxt 机构
nuxt 采用 vue webpack 等来构建渲染，相当于 vue-cli 了。
基本结构如下
> .nuxt
   +assets
   +build
   +dist
   +components
   +layouts
   +pages
   +plugins
   +server
   +static
   +store
   nuxt.config.js
   
assets: 资源文件 
static: 静态文件，不参与编译，和 express 中的 public 是一样的，可以将网页资源 dist/index.html 放入其中然后直接访问 host/dist 
build: npm run build 后生成编译后 node 执行文件
dist: npm run generate 后生成的静态站点，可放 githubpages 上
layouts: 和 express 中的 view 相同，为模板文件 
componnts: vue组件
pages: 服务端渲染的主要 vue 文件，内置 vue-router 根据 pages 目录结构生成路由
store: vuex,可通过传统的 vuex 配置或者和 pages 一样的，新建很多文件然后自动配置为 models，具体看文档
plugins: 插件
server: 服务器功能，接口等，在这里面接上 mongodb 进行接口处理。
nuxt.config.js: 总配置文件，可自己扩展。

nuxt 中有很多不同的概念

因为为组件渲染过去，所以是没有一般的 html head 标签中的内容的，所以引入了 vue-meta （好像是叫这个名字）,然后在组件 script 中有一个 head(){} 方法，可以设置 head 头

渲染涉及到数据，所以多出一个 asyncData(){} 和普通的 data 区别就是会一直等待数据获取到后再装填。配合 await 还挺好用的。

nuxt 其实和 express 比就多了个服务端渲染页面的功能，而且和 vue 的用法很像，上手也比较容易


## 目前所知bug
1. 
使用 pm2 进行管理的时候，pm2 的自启动对其好像无效
2. 
在手机端部分浏览器（uc）出现很多问题，如@click事件失效，无法引入文件等等
虽然提了 issuse ，但是得到的返回是等待下一次的更新和加上 babel-polyfill 配置。
```
build: {
	extend(config, {
		isClient
	}) {
		if (isClient) {
			config.entry.vendor.unshift('babel-polyfill');
		}
	}
}
```