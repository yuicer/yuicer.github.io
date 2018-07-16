---
title: git基本操作了解一下
categories:
  - 尺工
date: 2018-06-25 16:45:40
---
<p></p>
<!-- more -->

## 前言
一直依赖 vscode 提供的 git 操作，对于命令行的 git 以及一些操作完全学不来，所以学习记录一下一些基本操作

## 杂项
### vi 和 vim
vi 是文本编辑器，vim 是ide工具，不过一般都会默认将 vim 软连接指向 vi，可以输入 vi，发现和 输入 vim 是一样的
进入 vim 

1. a 变成输入模式，
2. esc 结束，
3. :q 退出 
4. :q! 强制退出 
5. :wq 保存并退出

## folk
看到好的项目之后，可以自己拿过来看看，folk 和 clone 的区别在于 folk 可以继续修改，进行 push 操作。

folk 之后有一个问题是同步，可以设置一个新的远端，然后主动 pull 下来进行更新
一般项目默认有个远端叫做 origin，是指向的自己的项目地址，pull 进行的操作都是从这个默认端。
`git pull origin == git pull` 
这里需要新增一个远端 
`git remote add newOrigin https:// github.com/baseProject.git` 
然后 
`git remote -v`
 就可以看到有两个 origin ，newOrigin ，之后指定拉取 newOrigin 的内容就可以 
 `git pull newOrigin master` 
 进行对应分支的跟新

ps::移除远端
`git remote rm newOrigin`

### pull request 
这个和 gitlab 上的 merge request 是一样的。都是提交给他人请求合并，同时也可以方便的 review 代码。

## 版本控制
### git reset --hard 了解一下 
推荐[廖雪峰](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013744142037508cf42e51debf49668810645e02887691000) 

ps: HEAD 指的是当前版本
回退上上个版本
`git reset --hard HEAD^^` 
查看历史版本,这时就可以看到历史的版本和版本号
`git log or git log --pretty=oneline`
查看所有 log，可以看到所有操作
`git reflog`
跳到某个版本
`git reset --hard [hash code]` 

## 切换分支缓存
当在当前分支有了修改但是又需要切到另一个分支的时候，可以用 git stash 存储，之后切换就会有一个干净的分支。之后回来的时候可以 `git stash apply` 再取出来，或者使用另一个命令 `git stash pop` 它相当于 `git stash apply && git stash drop`，当没有冲突的时候会直接取出缓存区并清理缓存区。