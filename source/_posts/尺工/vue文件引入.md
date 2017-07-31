---
title: vue文件引入
categories:
  - 尺工
comments: false
date: 2017-04-07 17:09:52
---
<p></p>
<!-- more -->
## 前言
 vue 引用的时候出现了很多问题，综合如下。

## 文件引入
在 webpack 中有 require 和 import 两种方法，可以看前一篇文章

### vue 引入插件
比如 tween jq three 等想要在每一个 vue 组件使用
1. 在 index.html 下手动加 script 标签加载。
缺点，无法应用 webpack 的打包，而且不符合模块化规范

2. 在需要的地方使用 var name = require('./name')
比如`var THREE = require('../../../static/three.min.js')`
缺点，对于每一个 vue 组件，都需要去这样写，而且还要根据文件的路径去做更改【这里可以用到别名，见最下】


3. 绑定到 vue 全局对象，
```
	var jq = require(./jq)
	Vue.prototype.jq = jq
```
缺点，写法麻烦，都得加 this.jq

4. 修改 webpack 中的配置
webpack.config
```
plugins: [
  new webpack.ProvidePlugin({
    $: 'jquery',
    jquery: 'jquery',
  })
]
```
之后 import $ from 'jquery
5. import export
文件小可以直接放到一个 js 中然后用一个对象包裹它并导出
缺点，需要文件小且能放为对象格式

### 外部 js 获取 vue 对象
1.在 main.js 配置文件中将 vue 实例 export 出来，在外部 js 中 import 。
```
export default new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
})
```
在外部 js 中 `import vm from './main.js'` 之后就可以用 vm.$store,vm.$http 等等
注意，如果有一个 vue 组件要去引用这个 js ，会报错 `vm is not found`，这个时候 vue 的实例还没有生成，而 imort 的 js 已经在去找这个实例
个人认为所有的组件都执行完后 vue 实例才会生成
可以使用官方提供的懒加载
`const Test = resolve => require(['components/test'], resolve)`
这样的话只有在访问后才会去执行这个组件中的代码

### vue 引入外部css
1. require('./css')
2. import './css'
3. 在 style 标签下 @import './csss'，加 scoped="true" 也没办法用
这3种都不能固定作用域
4. 更改 style 标签的 src
```
<style scoped="true" src="./css/main.css">
```
这个可以确定作用域。



## vue 加载图片
1. html 中 
写 `src = '~assets/logo.png'` 或者 :src = 'img.src'
这里的 img.src 为 data 的数据。这个数据中的 src 不能直接写原路径，必须写解析后的 src 
由于图片会被 loader 给解析，可能会变成 base64 格式，或者被改名加 hash 后缀等。写法如下
```
var img = require('path/to/img')
img.src = img; 
```
2. css 中，
`src = '~assets/logo.png'`

3. js 中
写外部 cdn 完整路径或者 require 之后的 src

## 加载字体等特殊文件
需要在 file-loader 或者 url-loader 中进行配置

### 使用别名
在不同的路径深度中引用【import 或者 require】一个固定路径的文件时很不方便，得../../的去找，所以在 webpack 的 config 文件中定义一个 alias 
```
 alias: {
            static: resolve('static'),
            src: resolve('src'),
            assets: resolve('src/assets')
        }
```
resolve 是一个方法，如下。__dirname 是当前所在路径，path.join 是 node 的方法，拼接字符串。
```
function resolve(dir) {
    return path.join(__dirname, '..', dir)  //这个 '..' 是为了返回到跟路径
}
```
注意此别名路径一定要写对，否则它会去把这个别名当作一个安装的模块，到 node_modules 里去查找，然后报错找不到，提示你 npm 安装。
使用： 
js： require('src/main.js')/import a from ('src/main.js')
html/css: src = "~assets/me.png"


