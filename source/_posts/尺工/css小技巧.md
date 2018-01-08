---
title: css小技巧
categories:
  - 尺工
 
date: 2017-12-13 18:18:40
---
<p></p>
<!-- more -->

### margin 垂直方向上撑起父元素
```css
<div id="box">
	<div id="content"></div>
</div>
<style>
	#box {
		width: 400px;
		height: 400px;
		background: #333;
	}

	#content {
		width: 100px;
		height: 100px;
		background: #fff;
		margin-top: 20px;
	}
</style>
```
cotent 的 margin-top 会变成父元素的 margin-top
这种情况是典型的 marging 在垂直方向上的重叠

解决 父元素添加
overflow: auto hiiden
padding
border
position: absolute fixed
### 垂直居中
和以前的 margin 负值差不多，只不过变成动态计算
```css
	{
		top: 50%;
		left: 50%;
		transform: translate3d(-50%,-50%,0)
	}
```

拉伸元素后 margin auto
```css
{
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
}
```

### 可编辑div
`contenteditable = "true"` 可以让普通的 div 进入可编辑模式，但是发现他有一个比较奇怪的特性，当定位 absolute 时，回车换行的出现方式有两种，向上出现和向下出现。
修改下方css top 为 bottom 后再按回车

<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=400 height=250 src="/demo/demo_171213"></iframe>

### 滚动条
滚动条在 css3 中有很多自定义的样式，下面的图可以很清楚的说明他们的关系
<img src="http://upload-images.jianshu.io/upload_images/4415565-784b4b9fe215261f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/700"/>

### 页面变高时滚动条出现导致网页内容左移
```css
html {
	overflow-y: scroll;
}

:root {
	overflow-y: auto;
	overflow-x: hidden;
}

:root body {
	position: absolute;
}

body {
	width: 100vw;
	overflow: hidden;
}
```
### 高度动画
让高度从固定到不固定产生动画效果
```css
#box{
	min-height: 200px;
	max-height: 200px;
	transition: all .5s;
}

#box: hover{
	max-height: 500px;
}
```
