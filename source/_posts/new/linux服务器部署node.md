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
项目目录下面启动 node start.js，之后就可以访问了
坑：将项目直接传过去之后用 npm start 启动项目完全没效果。原先的后台把端口号给禁用了。。

但是这种开启不能后台开启，挂掉0秒重载等功能，所以需要用到高大上的 pm2 工具了。
******
在查找 pm2 的时候偶然看到了尤雨溪大大的一个部署工具 pod ，所以果断去试着用了用。
然而1个小时后由于没学会。。。又滚回了直接用 pm2 。
******
pm2 的官网文档很不错[官网](http://pm2.keymetrics.io/)
对于项目配置文件，这里是 json 格式
```
{
    "apps": [{
        // Application #1
        "name": "front_end",
        "script": "./bin/www",      //脚本位置，默认由 node 执行
        "cwd": "./front_end",       //文件启动位置
        "args": ["--toto=heya coco", "-d", "1"],
        "node_args": "--harmony",
        "merge_logs": true,
        "instances": 4,         //4个实例
        "exec_mode": "cluster",     //多进程模式
        "error_file": "./log/err.log",      //以下为 log 日志
        "out_file": "./log/out.log",
        "pid_file": "./log/pids.pid",
        "env": {
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
配置好后直接 pm2 start all。
******
额，用了之后感觉还是得有个 git 仓库来管理比较好，所以，，，我又用回了 pod 。。
远端 pod create myapp
本地git clone ssh://your-server/pod_dir/myapp.git
这样就建好了一个 git 仓库









