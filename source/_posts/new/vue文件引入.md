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
这次讲以前的一个项目导入到 vue 组件中的时候出现了很多问题，以前的项目是典型的 js + css + html 这样，vue 组件是 vue-cli 搭建。

## 文件引入
在 webpack 中有 require 和 import 两种方法，可以看前一篇文章

### vue 引入全局插件
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

### vue 引入外部css
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
在外部 js 中 import vue from './main.js'之后就可以用了。vue.$store,vue.$http 等等
注意，如果在另外的 vue 组件要去引用这个外部 js ，并且放在 mounted 里执行的时候
some.vue
```
import f from './js'

mounted: function() {
    f();
    setTimeout(function() {
        f()
    }, 1)
},
```
第一个 f() 是找不到 vue 实例的，如果一定要在 mounted 里用，可以 setTimeout 。
原因我猜想可能是这个全局的 vue 实例是包含所有 .vue 组件的，当你这个组件还没渲染完【在 moounted 的时候】，这个 vue 实例是没有初始化完的，所以对它引用时会找不到这个对象

### vue 加载图片
由于图片会被 loader 给解析，可能会变成 base64 格式，或者被改名加 hash 后缀等，所以不能直接去修改 img.src。
对于 css 中，直接写图片的原路径即可
对于 html ，需要在 img 标签中加上 :src
对于 js 
```
var img = require('path/to/img')
img_el.src = img; 
```
因为 js 是动态加载的，所以此时已经经过了编译转码，图片名已经被改变。

## 使用别名
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