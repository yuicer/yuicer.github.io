---
title: css小技巧
categories:
  - 尺工
comments: false
date: 2017-04-18 18:18:40
---
<p></p>
<!-- more -->
## 页面变高时滚动条出现导致网页内容左移
```
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
## 高度动画
让高度从固定到不固定产生动画效果
```
#box{
	min-height: 200px;
	max-height: 200px;
	transition: all .5s;
}

#box: hover{
	max-height: 500px;
}
```
## 手机动画前缀
```

#test {
	width: 150px;
	height: 100px;
	background: red;
	animation: test 5s infinite;
	-webkit-animation: test 5s infinite;
	position: relative;
}

@keyframes test {
	from {
		left: 0px;
	}
	to {
		left: 200px;
	}
}

@-webkit-keyframes test {
	from {
		left: 0px;
	}
	to {
		left: 200px;
	}
}
```