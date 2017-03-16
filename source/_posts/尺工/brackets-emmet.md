---
title: brackets_emmet
categories:
  - 尺工
comments: false
date: 2017-03-13 10:56:29
---
<p></p>
<!-- more -->
## 前言 
今天换电脑装的时候重新装 brackets 环境，还是遇到以前装 emmet 时候的问题，装不上，记得当时也是折腾了好久，最后不知道怎么的就号了。。这一次试了很多方法依旧没用，最后在知乎上找到解决方法记录如下。

## 解决
1.首先还是在 brckets 中安装 emmet，肯定还是有问题，先不管他，让它有个目录配置文件就好。
2.打开菜单-帮助-显示扩展目录，找到 user 下的 brckets-emmet 文件夹，进入后新建文件夹 node_modules 【若已有则不需要】
3.npm install emmet 包后，将 node_modules 复制过去
4.f5 刷新后 f12 打开控制台看报错，若报错是 ..\Brackets\extensions\user\brackets-emmet\node_modules\emmet\lib 下找不到 caniuse.json 文件，就在自己下的 node_modules 文件中全局查找该文件，然后将它复制过去。
5.试试 p + table。
6.成功

