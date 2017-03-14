---
title: svgo
categories:
  - 尺工

comments: false
date: 2016-12-16 19:02:11
---
<!-- more -->
## svgo
	npm install -g svgo   //安装svgo

	svgo -f svg(文件夹名字 )  //对文件夹里面的svg进行操作
	svgo -f svg -o output    //输出到平级的另一个output文件夹
	svgo test.svg  //对单个文件操作


#### 这个工具会把ps生成的svg精简很多，不过其中一个 fill （颜色）会保留，如果需要得自己去修改

#### svg的话属于矢量图，而且代码形式存在，比直接用图片要快的多，节省很多http请求，而且也快，支持js，css控制。超强不过一般设计不会给这个。。。