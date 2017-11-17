---
title: noteOfNode(三)
categories:
  - 尺工
date: 2017-11-17 16:28:57
---
<p></p>
<!-- more -->

## koa

## node import
node 暂时还不支持 import export ，虽然使用 `node --experimental-modules my-app.mjs` 可以使用，但是并不方便，而且在这个文件中的 require 也会被改变用法导致加载会不正确，
还是需要使用 babel 来进行适配，推荐使用 babel-cli ，开发环境使用 babel-node,生产环境使用编译后的文件。


