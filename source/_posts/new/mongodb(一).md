---
title: mongodb(一)
categories:
  - 尺工
comments: false
date: 2017-06-07 09:21:44
---
<p></p>
<!-- more -->
## 前言
想向全栈发展，所以就准备去学下后台。node+mongodb

## 简单后台框架
直接用了 express 生成了一个，方便好用。由于是基于node的，文件引入用require。
项目结构也比较简单。
> servre
  -+bin  放脚本命令
  -+log  放日志
  -+public  静态文件,这个静态文件时可以直接访问到的。
  -+routes  路由，接口，可返回数据等
  -+views  模板视图，用 jade 编写，也可以改成 html。
  
如果要新增加接口就在路由里面多建立一个文件，然后 app.js 引用就好。

## 环境部署
一般开发都是在本地，然后运行放服务器上，两边同步很麻烦，所以一般都是在服务器上弄个 git 仓库。
在服务器上一般都会用 pm2 工具，他能让后台程序一直在服务器上跑。然后 pm2 里面自带一个 deployment ，可以设置后同步远程
我最开始用的是尤大大的 pod 工具,也是一样的逻辑，只不过稍微有点区别。
然后使用 pm2 的话可以写个配置脚本去启动后台程序
nodeserver.json
```
{
	"apps": [{
		// Application #1
		"name": "server",
		"script": "./bin/www",      //脚本命令
		"cwd": "apps/server",		//运行位置
		"args": ["--toto=heya coco", "-d", "1"],
		"node_args": "--harmony",
		"merge_logs": true,
		"instances": 4,			//4个进程
		"exec_mode": "cluster",		//采用 cluster 来模仿多进程，实际使用多 cpu 来实现
		"error_file": "./log/err.log",
		"out_file": "./log/out.log",
		"pid_file": "./log/pids.pid",
		"env": {
			"NODE_ENV": "development",
			"AWESOME_SERVICE_API_TOKEN": "xxx"
		},
		"env_production": {
			"NODE_ENV": "production"
		}
  }],
}

```
他可以配置多个程序，启动也很方便，pm2 start nodeserver.json。然后出错会自动重启，文件有更改自动跟新，挺方便的
之后可以配置下服务器开机自启动。这个也很简单。
他的主要逻辑是保存当前的状态，下次开机时获得权限再启动它。

### 配置
pm2 list 看到已启动的进程后 pm2 startup 
之后它会打印出一系列命令，中间有一部分是让你执行的，复制后执行一遍
当把它所说的执行完后，会再度打印一串内容
之后 pm2 save 就完成了，非常简单。
之前有一篇 linux 服务器部署和这个差不多

## mongodb
windows 下用 mongodb 打开比较麻烦，所以就写了个 .bat 方便打开
```
@echo off
c:
cd \Program Files\MongoDB\Server\3.4\bin
mongod.exe --dbpath d:\mongo\db
pause
```
之后本机的 27017 端口就可以连接

### robomongo
这是一个 mongodb 的可视化工具，挺方便的。




