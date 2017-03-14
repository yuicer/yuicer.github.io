---
title: next自定义相册
categories:
  - 尺工
comments: false
date: 2017-02-23 17:03:32
---
<p></p>
<!-- more -->
## 前言
对于hexo 的主题 next 搭建 blog ，还是感觉不怎么好用，
1. 文件结构很混乱，想要改一个样式发现有好几个地方都能设置，但是效果竟然还不一样。
2. 生成的文件也是有很多不需要的设置，臃肿。
3. 对资源的加载速度太慢
4. 定义了很多全局的变量，方法。自己想要在写个 js 还得考虑明名冲突问题，而且还不知道它到底定义了哪些
5. 插件乱，虽然内置了很多插件，但是并不能很个性化的定制，还要自己一点点改。

不过。。。还是很感谢它帮我完成了自己的第一个博客吧。

## 相册
在不少空间都有看到有很赞的图文模式，比如 lofter （pc）这样子的，所以也想去搞一个相册，放一些自己摸鱼啊拍照什么的。
既然是自己写的话，就肯定做比较好用的，比如 cdn加速啊，自动化部署啊，图片懒加载啊，图片加载效果啊（比较喜欢知乎pc现在的图片加载方式）

## cdn加速
这个就直接想到了用图床，速度肯定比我放 github 上快，并且 github 空间流量有限。所以就拿住所周知的七牛当图床了

### 七牛
首先注册登录后就送了每月 10g 的空间和 10g 流量，还是很不错的
之后就在对象存储里面创建一个存储空间，然后再开发文档里面找到 node.js sdk 照着上面 `npm install qiniu` 然后运行它给的那段代码就好了。
之后就把链接换掉，用七牛的链接就好
### 代码
就比文档上给的多了一个取得所有文件名字的 node 操作。
```
var qiniu = require("qiniu");
const fs = require('fs')
const path = "./img"
var file_name = [];
//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'yours';
qiniu.conf.SECRET_KEY = 'yours';

//取得所有资源名字
function get_file_name(path) {
	let files = fs.readdirSync(path)

	for (let i = 0; i < files.length; i++) {
		if (fs.statSync(path + '/' + files[i]).isFile())
			file_name.push(path + '/' + files[i])
		else
			get_file_name(path + '/' + files[i])
	}
}
get_file_name("./img")
	//要上传的空间
bucket = 'yuicer';

//上传到七牛后保存的文件名
var key = []
for (let i in file_name) {
	key[i] = file_name[i].substring(2)
}

//构建上传策略函数
function uptoken(bucket, key) {
	var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
	return putPolicy.token();
}

//生成上传 Token
var token = []
for (let i in file_name) {
	token[i] = uptoken(bucket, key[i]);
}

//要上传文件的本地路径
var filePath = []
for (let i in file_name) {
	filePath[i] = file_name[i]
}

//构造上传函数
function uploadFile(uptoken, key, localFile) {
	var extra = new qiniu.io.PutExtra();
	qiniu.io.putFile(uptoken, key, localFile, extra, function (err, ret) {
		if (!err) {
			// 上传成功， 处理返回值
			console.log(ret.hash, ret.key, ret.persistentId);
		} else {
			// 上传失败， 处理返回代码
			console.log(err);
		}
	});
}

//调用uploadFile上传
for (let i in file_name) {
	uploadFile(token[i], key[i], filePath[i]);
}

```
## 自动化部署
每次加张图片还得去改代码太麻烦，所以就把图片地址单独抽出来放一个文件然后去引用它做到自动化。
用 node 读取放图片的文件夹取得图片名字，然后修改后加上七牛前缀再写出到一个文本文件，之后在 js 里面去 ajax 请求这个文本文件获得地址，然后去替换 img 的 src 。因为 img 用的是 vue 的 for 循环渲染，所以相当得好替换，代码就不给了