---
title: A-FRAME(一)
categories:
  - 尺工
comments: false
date: 2017-09-13 13:09:48
---
<p></p>
<!-- more -->
## 前言
接着上篇的 [VR](/2017/08/17/new/VR/) 介绍这个新出的库

## 概念
嗯。。这个库已经明说了是对 three.js 的封装。而且既然还是 [ECS](/2017/08/07/尺工/ECS/) 模式的
看来和这个库还真是有缘。

在这个框架里面。代码依赖在 dom 上，通过对属性的重写来实现 3d 组件，如常规的场景，摄像机，灯光，实体等。
这种绑在 dom 上的写法刚开始很不习惯。。什么都往 dom 上加，然后通过选择器选 dom 进行操作，`setAttibute addeventlistener` 来进行操作。另外因为之前都用 `requestAniamtionFrame` 来主动控制，添加场景实体等操作，所以对于这种非主动控制的有点无从下手。

不过熟悉之后发现，这种写法还是很好的。通过注册组件来自定义行为，将组件作为属性加到 dom 上使其自动渲染生效。

### 下面是一段简单的例子
```
<a-box 
		position="-1 0 -5" 
		rotation="45 45 0" 
		color="#4CC3D9"
		float="to: -1 0.5 -5;"
></a-box>

AFRAME.registerComponent('float', {
	schema: {
		animation: {
			type: 'string',
			default: "property: position; dir: alternate; dur: 2000;loop:true; easing: easeInOutSine;"
		},
		to: {
			type: 'string',
			default: '0 0 0;'
		}

	},
	init: function () {
		var data = this.data;
		this.el.setAttribute('animation__float', data.animation + 'to:' + data.to);
	}
});

```

`position rotation color` 这些是自带的一些组件。animation 则是一个三方的[库](https://github.com/ngokevin/kframe/tree/master/components/animation/)，官方主动说建议放弃自己的 `<a-animation>` 标签而使用这个。。

A-FRAME 框架自动集成了很多东西，也有很多默认值。大多数还是挺方便，少部分找不到对应的 api 就很麻烦。而且由于它把所有的过程都封装了，所以对渲染的流程可能会有些不清楚。
