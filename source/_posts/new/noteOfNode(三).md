---
title: noteOfNode(三)
categories:
  - 尺工
date: 2017-11-17 16:28:57
---
<p></p>
<!-- more -->

## koa

## export module.exports
node 暂时还不支持 import export ，虽然使用 `node --experimental-modules my-app.mjs` 可以使用，但是并不方便，而且在这个文件中的 require 也会被改变用法导致加载会不正确，
还是需要使用 babel 来进行适配，推荐使用 babel-cli ，开发环境使用 babel-node,生产环境使用编译后的文件。

在 node 中有另外一套文件加载的系统，不同于 es6，它是遵循于 commonJS 的规范，`module.exports & require`,
除了加载库，它也可以加载文件，module.exports 默认导出一个空对象，可以在它上面添加挂载对象，也可以直接赋值
```
b.js

module.exports = {
  a:1,
  b:function(){}
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

