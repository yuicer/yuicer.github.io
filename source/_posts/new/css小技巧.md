---
title: css小技巧
categories:
  - 尺工
comments: false
date: 2017-01-22 11:18:40
---
<p></p>
<!-- more -->
## 高度动画
让高度从固定到不固定产生动画效果
#box{
	min-height: 200px;
	max-height: 200px;
	transition: all .5s;
}

#box: hover{
	max-height: 500px;
}
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