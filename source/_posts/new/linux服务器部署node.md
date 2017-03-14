---
title: linux服务器部署node
categories:
  - 尺工
comments: false
date: 2017-03-08 11:02:54
---
<p></p>
<!-- more -->
## 前言
在活动项目中自己利用 node 搭建后台
## 工具
PuTTY	
连接 windows 服务器的话直接在运行里面输入 msysc 进行远程连接就可以，但是 Linux 服务器是通过 ssh 来连接的，所以需要下这么一个工具去进行连接，下载后直接输入服务器 ip，进入后输入 账号，密码就可以进到 Linux 的命令行环境。

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
ls
./node -v	//输出版本号，表示在当前目录下可用

ln -s /root/node-v6.10.0-linux-x64/bin/node /usr/local/bin/node  设置全局
ln -s /root/node-v6.10.0-linux-x64/bin/npm /usr/local/bin/npm

node -v  // 之后就可以在任意位置使用
```
坑：我自己之前自作聪明，下到本地后先解压后改了名字【想着好打一点】，把文件夹传了过去，可是`./node -v`根本就没用。。哎。

配置 node 环境变量 
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
### 启动项目
项目目录下面启动 npm start，之后就可以通过 ip:3000 访问了
坑：将项目直接传过去之后用 npm start 启动项目完全没效果。原先的后台把端口号给禁用了。。

但是这种开启不能后台开启，挂掉0秒重载，所以需要用到 pm2 工具。
******
在查找 pm2 的时候偶然看到了尤雨溪大大的一个部署工具 pod ，所以果断去试着用了用。
首先在服务端和本地都要安装 `npm install pod -g`
安装之后配置一个路径生成目录，也可以不配置，第一次 create 会自动生成，目录如下
```
├── repos # holds the bare .git repos
│   └── example.git
└── apps # holds the working copies
    └── example
        ├──app.js
        └──.podhook
```
服务端 `pod create myapp`，会在 apps 下创建一个 myapp 的 git 仓库
本地拉取`git clone ssh://yourserver/pod_dir/repos/myapp.git`
之后就可以在本地进行修改，之后 git push 直接上传，不用麻烦的传文件到服务器上了。并且还有版本管理功能。
********
事实证明并不是那么好用。。看文档没学会后又滚回了直接用 pm2 。毕竟 pm2 的文档以及用法很容易找


