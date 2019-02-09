---
title: noteOfNode(三)
categories:
  - 尺工
date: 2017-11-17 16:28:57
---

<p></p>
<!-- more -->

## koa

之前一直用的是 express-generator 的模板 和 nuxt/express 模板。。总感觉还是得去自己了解下内部的实现方式，老套框架真出了问题又找不到就麻烦了。
所以准备用 koa 这个轻型框架来自己搭一个后台系统。

[koa](http://koajs.com) 本身和 express 就很像，只不过它更单纯，没有许多的中间件，只是单纯的封装了一些常用方法和 request respoense，与 express 相比，将其中许多的中间件给分离出去，来达到高效，轻量。

### 特色

koa 中一个特色是 async/await (对 node 版本有要求 node^7.6.0,或者配置 babel)
使用也很简单

```js
const koa = require('koa')
const app = new koa()

app.use(async ctx => {
  var data
  await db.find(data)
  ctx.body = data
})
app.listen(3000)
```

另一个特点就是和 express 一样的中间件系统，中间件的顺序以及传递，错误处理

```js
app.use(async (ct x,next) => {
  var time1 = Date.now()
  await next()
  var ms = Date.now() - time1
  console.log('ms:' + ms)
})
app.use(async ctx => {
  //do something
})

//err handler
app.use(async ctx => {
  if (404 == ctx.status) {
    //do something
  }
})
```

### 中间件

常用的也就是 koa-static 和 koa-router，文档也很详细，
其他插件比如 socket.io axios body-parser mongoose 等

## exports module.exports

node 暂时还不支持 import export ，虽然使用 `node --experimental-modules my-app.mjs` 可以使用，但是并不方便，而且在这个文件中的 require 也会被改变用法导致加载会不正确，
还是需要使用 babel 来进行适配，推荐使用 babel-cli ，开发环境使用 babel-node,生产环境使用编译后的文件。

在 node 中有另外一套文件加载的系统，不同于 es6，它是遵循于 commonJS 的规范，`module.exports & require`,
除了加载库，它也可以加载文件，module.exports 默认导出一个空对象，可以在它上面添加挂载对象，也可以直接赋值

```js
b.js

module.exports = {
  a: 1,
  b: function() {}
}

a.js

var test = require('./b.js')
console.log(test)
/* 
{
  a:1,
  b:function
}
*/
```

而 exports 则是一个快捷方式，它只相当于一个变量，有初始赋值 exports = module.exports。
所以对于挂载到 exports 上的属性可以被导出，但是赋值给 exports 会导致他不在绑定到 module.exports 上，而不能被导出。
