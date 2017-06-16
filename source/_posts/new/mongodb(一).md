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
  +bin  脚本命令
  +log  日志
  +public  静态文件,访问public下的dist,localhost:3000/dist
  +routes  路由，接口
  +views   模板视图，用 jade 编写，也可以改成 html。
  -app.js  主控制文件
  -package.json
  
如果要新增加接口就在路由里面多建立一个文件，然后 app.js 引用就好。
这是个典型的 mvc 模式，
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
也可以写入全局变量然后运行

### robomongo
这是一个 mongodb 的可视化工具，挺方便的。

###  连接
用 mongoskin 或者 mongoose 都可以，不过用 mongoose 的多很多
连接端口号`mongodb://localhost:27017/test`
之后直接返回就可以
```
router.get('/', function (req, res, next) {	
		res.send(something)
});
```
test为你的某一个数据库，之后就可以进行操作了。这里我用的是mongoose，这个再找一篇说这个。





