---
title: linux服务器部署node
categories:
  - 尺工
 
date: 2017-06-1 17:02:54
---
<p></p>
<!-- more -->
## 前言
在活动项目中自己利用 node 搭建后台
## 工具
PuTTY	
连接 windows 服务器的话直接在运行里面输入 msysc 进行远程连接就可以，但是 Linux 服务器是通过 ssh 来连接的，所以需要下这么一个工具去进行连接，下载后直接输入服务器 ip，进入后输入账号，密码就可以进到 Linux 的命令行。

WinSCP
图形化文件传输系统，可以方便的将文件传到服务器上
## 配置服务器
### 安装node
打开 PuTTY，输入服务器 ip 后就看到命令行界面，输入账号和密码进入服务器。
检查服务器多少位下载对应的 node 版本。
下载之后利用 WinSCP 将下好的压缩包拖进去，然后执行以下代码
```
tar xvf node-v6.10.0-linux-x64.tar.xz //解压

cd node-v6.10.0-linux-x64/bin
设置软连接
ls
./node -v	//输出版本号，表示在当前目录下可用

ln -s /root/node-v6.10.0-linux-x64/bin/node /usr/local/bin/node  设置全局
ln -s /root/node-v6.10.0-linux-x64/bin/npm /usr/local/bin/npm

node -v  // 之后就可以在任意位置使用
```
坑：我自己之前自作聪明，下到本地后先解压后改了名字【想着好打一点】，把文件夹传了过去，可是`./node -v`根本就没用。。哎。因为覆盖过去的没有权限

### 配置 node 环境变量 
设置全局变量
首先进入`vim /etc/profile`
按 i 进入编辑模式，在文本的最下面输入以下语句
```
export NODE_HOME=/root/node-v6.10.0-linux-x64
export PATH=$PATH:$NODE_HOME/bin
export NODE_PATH=$NODE_HOME/lib/node_modules
```
按 esc 退出编辑模式，打 :wq 退出保存，
输入 `source/etc/profile`使配置生效
坑：之前不知道这个玩意，npm 装的全局包一直保没有报 not command，因为找不到装的路径位置。后来把环境变量加上去的时候【复制的网上的代码】错打了几个字符，然后就还是报错。导致折腾了一个小时。

## 启动项目
项目目录下面启动 node start.js，之后就可以访问了【用 express 很方便】
坑：将项目直接传过去之后用 npm start 启动项目完全没效果。原先的后台把端口号给禁用了。。

一般开发都是在本地，然后运行放服务器上，两边同步很麻烦，所以一般都是在服务器上弄个 git 仓库。
在服务器上一般都会用 pm2 工具，他能让后台程序一直在服务器上跑。然后 pm2 里面自带一个 deployment ，可以设置后同步远程
我最开始用的是尤大的 pod 工具,也是一样的逻辑，只不过稍微有点区别。

### pm2
pm2 的官网文档很不错[官网](http://pm2.keymetrics.io/)
对于pm2项目配置文件nodeserver.json,可管理多个项目
```
{
    "apps": [{
        // Application #1
        "name": "server",
        "script": "./bin/www",      //脚本位置，默认由 node 执行
        "cwd": "./front_end",       //文件启动位置
		"watch": ["routes","models","views"],	//监听改变自动加载
        "instances": 4,         //4个实例
        "exec_mode": "cluster",     /多核cpu模拟多进程模式
        "error_file": "./log/err.log",      //以下为 log 日志
        "out_file": "./log/out.log",
        "pid_file": "./log/pids.pid",
        "env": {						//环境配置
            "NODE_ENV": "development",
            "AWESOME_SERVICE_API_TOKEN": "xxx"
        },
        "env_production": {
            "NODE_ENV": "production"
        }
  }]
}

```
如果有多个项目，再向数组里加上一个就好。配置文件可以放在根目录。
运行
pm2 start nodeserver.json
重启
pm2 restart all
停止
pm2 stop all
关闭
pm2 kill

#### pm2开机自启动
pm2 list 看到已启动的进程后 pm2 startup 
之后它会打印出一系列命令，中间有一部分是让你执行的，复制后执行一遍
当把它所说的执行完后，会再度打印一串内容
之后 pm2 save 就完成了，非常简单。

### pod
远端 pod create myapp 会建立一个目录

> root
  -pod
   -apps
    +myapp
    -repos
     +myapp.git
  
这样就建好了一个 git 仓库
本地git clone ssh://your-server/pod_dir/myapp.git
然后将项目结构修改如下

> nodeserver
 -noserver.json
 -README.md
 -apps
  +server
  	
 



