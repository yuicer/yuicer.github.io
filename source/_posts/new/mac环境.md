---
title: mac环境
categories:
  - 尺工
date: 2018-02-28 11:50:21
---
<p></p>
<!-- more -->

## homebrew 
mac 下安装各种软件包，通过 npm 的方式来安装，`brew install thing brew uninstall thing`，而且他会自动关联对应的链接，比较方便

## iterm
一个命令行工具，比自带的终端好用

## 命令行操作
>mkdir 建立文件夹
rm [-rf] 移除文件[文件夹]
mv one two target 移动[重命名]文件[夹]
clear 清屏
ls -a 显示隐藏文件

## mac 操作
mac 和 linux 系统很像，没有 windows 类的桌面，文件的图形化操作系统。mac 下操作用到命令行会很多，而且会有很多权限问题。

>`commond + 回车`可以唤出应用搜索工具，快速打开
commond 键相当与 windows 的 ctrl
`双指触摸板点击` 等于右键点击
`commond + z` 撤回
`commond + shift + z` 反撤回
`commond + ctrl + f` 全屏

### 浏览器
>`commond + r`页面刷新
`双指操作`左右滑动前进后退

### 更改用户
emmmm，这个特别坑，本来是想改登陆账户的名字，在用户和群组里面试着改了一下，结果把账号权限改没了。。然后登陆也登不上。后来网上找了个办法
```
按开机键的时候按住 command+s 
出现命令行终端的时候按照以下顺序输入命令： 
/sbin/mount -uaw 
rm var/db/.applesetupdone 
reboot 
```

### .DS_Store
mac 隐藏文件。。很可能不小心就给传 git 上去了，
1. 删除项目中的.DS_Store
```
find . -name .DS_Store -print0 | xargs -0 git rm -f –ignore-unmatch 
将 .DS_Store 加入到 .gitignore

echo .DS_Store >> ~/.gitignore 
更新项目

git add –all

git commit -m ‘.DS_Store banished!’
```

2. 给 git 添加全局配置
在 gitconfig 文件目录下新建一个`vim gitignore_global `文件，写入忽略 .DS_Store,然后再添加到 gitconfig 中，添加方式有两种，一种直接打开 gitconfig 文件，写入 
```
[core]
	excludesfile = /Users/you/.gitignore_global
```
或者再命令行中输入
```
git config --global core.excludesfile ~/.gitignore_global
```