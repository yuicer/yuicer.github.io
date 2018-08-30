---
title: iphonex适配
categories:
  - 尺工
date: 2018-04-17 13:59:23
---
<p></p>
<!-- more -->

## 前言
傻*苹果设计师，iphonex 顶部设计的很奇怪，底部的内容会被按钮给盖住，导致不好点击，观看。特别是底部的 fixed 元素

## 解决方法
### 自己判断处理
```
isIphoneX() {
  return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
}
```

进行判断之后对元素增加边距

### ios 提供标准

设置 meta 属性 `<meta name="viewport"  viewport-fit=cover">`，之后可以使用 ios 提供的属性`safe-area-inset-top safe-area-inset-bottom safe-area-inset-left safe-area-inset-right`来处理。比如对于底部可以设置如下，这样在 iphonex 中就会有一个 padding-bottom，将底部向上抬
```
padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
```
constant 和 env 分别是不同版本 ios 支持的关键词，是一个意思，本质相当于是一个常量，比如 50px 的固定数值，且只有被支持时才会生效

对于 fixed 元素另外单独设置 `env(safe-area-inset-bottom)` ，不仅限与`padding-bottom`，只要是用数量单位的比如`left,margin`都可以使用

