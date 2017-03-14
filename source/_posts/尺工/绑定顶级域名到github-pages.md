---
title: 绑定顶级域名到github_pages
comments: false
date: 2016-12-15 17:45:24
categories:
  - 尺工
---
<p></p>
<!-- more -->
## 首先需要一个域名
随便去哪买一个呗，又不算贵。。
> 当时不知道，买了个最贵的.com。

## 设置gtihub.io
### username自己取名字
首先去github建立一个username.github.io仓库，这个仓库是github专门给每一个用户留出的一个展示自己网页的【github pages】，把内容传到这个仓库之后，直接访问username.github.io就可以看到你的github pages。
如果想要绑自己的域名，先去买个域名，然后设置dns，再传一个CNAME文件到github仓库。注意这个文件没有后缀
文件内只写入 `username.com`
## dns设置
添加两条记录，这样访问以下三个url都能访问到
> username.github.io
www.username.com
username.com

	CNAME        @        username.github.io
	CNAME       WWW       username.github.io
想更详细的看如何设置解析点[这里](https://help.github.com/articles/about-supported-custom-domains/)
## github仓库限制
GitHub Pages源文件库的建议限制为1GB。
发布的GitHub Pages网站不大于1GB。
GitHub Pages网站的流量限制为每月100GB。
GitHub页面网站的限制为每小时10个构建
	
