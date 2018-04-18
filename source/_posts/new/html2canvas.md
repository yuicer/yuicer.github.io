---
title: html2canvas
categories:
  - 尺工
date: 2018-04-09 18:09:27
---
<p></p>
<!-- more -->

## 前言
网页截图这个需求之前也有遇到，虽然做了个小 demo，用 canvas 可以生成图片，但是没有具体去看细节，还是有很多坑

## 原理
截图功能原理基本就是通过 canvas 提供了一个 api，canvas.toDataUrl()，通过它可以将 canvas 的内容转化为 base64 的格式，另外还有一个 api 是转化为 blob 格式，canvas.toBlob()。所以我们将 dom 上需要截屏的区域画到 canvas 上后，再保存为数据，之后 new Image，当作 src 传进去就可以生成图片了。

`canvas.toDataURL(type, encoderOptions)`
第一个字符串参数是保存的类型，默认为 image/png，第二个是保存的质量，默认为 0.92

`canvas.toBlob(callback, type, encoderOptions)`
callback,回调函数，可获得一个单独的Blob对象参数。第二，三个参数同上

## html2canvas
[地址](https://github.com/niklasvh/html2canvas)

```
html2canvas(document.body).then(function(canvas) {
    document.body.appendChild(canvas);
});
```

这个库简化了将 dom 转化为 canvas 上的图像一过程。同时它也有很多的限制

## 坑
它对浏览器有要求，需要支持 promise，用个 ployfill 可以解决

对 css 样式有部分不支持。但是基本够用了

图片生成可能会模糊，有两个方法，第一个是在最新版本 html2canvas 中有提供 scale 属性
```
me.html2canvas(dom, {
  scale: 2,
})
```

还有提供其他很多的[选项](https://html2canvas.hertzen.com/configuration)，

另一种则是自己去设置 canvas，通过放大 canvas 到绘画内容，缩小 canvas 到样式宽高来达到目的，原理就是样式是去拉伸 canvas，而 js 中设置的宽高是实际宽高
```
canvas {
  width: 100%;
}

var canvas = document.querySelector('canvas')
var scale = 2
canvas.width = document.documentElement.clientWidth * scale
canvas.height = 100 * scale
var ctx = canvas.getContext('2d')
ctx.scale(scale, scale)
```

图片需要处理跨域问题，不然就截取不到图片，这个其实是 canvas 的问题

>尽管不通过 CORS 就可以在画布中使用图片，但是这会污染画布。一旦画布被污染，你就无法读取其数据。例如，你不能再使用画布的 toBlob(), toDataURL() 或 getImageData() 方法，调用它们会抛出安全错误。
这种机制可以避免未经许可拉取远程网站信息而导致的用户隐私泄露。

但是很多对图片都是用的图床 cdn，不方便去设置跨域。所以解决方法一般都是将请求到的图片转化为 base64 后替换图片 src。

另外在一种极限情况下，网页刚打开就去截图的时候，可能会由于图片没有渲染完毕或加载完毕导致截图截的是部分图片

其他奇怪bug。。项目里面设置的一个弹窗竟然会顶导致生成的图片也被顶上去了。。。。此bug没找到原因，最后绕道而行了。。。




