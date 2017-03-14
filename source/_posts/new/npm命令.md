---
title: npm命令
categories:
  - 尺工
comments: false
date: 2017-01-05 12:16:19
---
<p></p>
<!-- more -->
npm下载去官网或者安装node的时候会自带安装，之后在命令行使用就好。
打开命令行的快捷方式（windows下）
1. shell脚本
2. win + r
3. 当前文件夹按住 shift 时鼠标右键点击，菜单中会出现**在此处打开命令行**

查看全局安装的包
## npm list -g --depth 0

生成package.json文件
## npm init
 
## npm outdated
列出需要更新的包
```
G:\yuicer\test>npm outdated
Package                Current         Wanted  Latest  Location
babel-core             MISSING         6.21.0  6.21.0  test
babel-loader           MISSING         6.2.10  6.2.10  test
babel-preset-es2015    MISSING         6.18.0  6.18.0  test
cross-env              MISSING          3.1.4   3.1.4  test
css-loader             MISSING         0.25.0  0.26.1  test
file-loader            MISSING          0.9.0   0.9.0  test
vue                    MISSING          2.1.8   2.1.8  test
vue-loader             MISSING         10.0.2  10.0.2  test
vue-template-compiler  MISSING          2.1.8   2.1.8  test
webpack                MISSING  2.1.0-beta.28  1.14.0  test
webpack-dev-server     MISSING  2.1.0-beta.12  1.16.2  test
```
`npm install package-name `
如果不加包名则根据package.json去安装。
`-g --save --save-dev`
--save 安装到 dependencies --save-dev 安装到 devDependencies -g 全局安装
## git help config 
获取git的命令手册，在网页中打开

## git config 
--list 检查git的配置 

## 生成ssh密钥，
在git-bash中，`cat ~/.ssh/id_rsa.pub`用来查看ssh密钥，
如果没有则创建ssh-keygen -t rsa -C "yuicer@yeah.net"
windows下用`clip < ~/.ssh/id_rsa.pub`来复制到剪贴板中


## npm install npm@latest -g
更新npm到最新版本，更新node去官网再下一个

## npm update
跟新依赖