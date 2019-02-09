---
title: travis
categories:
  - 尺工
date: 2019-2-03 17:03:08
---

<p></p>
<!-- more -->

master .github.io config avalon

## 前言

今天看到大佬的项目【https://www.calibur.tv/】,里面有一个 travis.yml 的东西，然后研究了一下。是一个 github 专用的 cicd 工具。所以研究了一下。。

## 使用

[去 travis 官网](https://travis-ci.com/)，授权 github，然后关联想要加的项目。这样当 github push 上去后就会触发这个钩子。

它的本质是在另一个环境里面去进行一系列的操作，类似于微服务的概念，可以构建不同的环境【支持各种主流语言】，传入不同当变量。然后执行命令。

所以对于博客的话就会很方便。push 之后触发钩子，在 travis 上编译静态资源，然后 push 到 github pages 的分支上。
所以针对我们的这个功能，它是需要一个 github 仓库的密钥的。

## 环境参数密钥 access_token

由于我们执行 travis 是需要 github 的权限，但是又不能直接写文件上。所以我们需要借助一下 travis 的定义变量。在关联的仓库项目中设置 Environment Variables 。添加一个自己的 github 的 access token。在 github 个人设置的 Settings / Developer settings / Personal access tokens 中新建立一个 travis_token 权限只给一个 repo 的就可以了，然后在 travis 填写这个 token，比如 ACCESS_TOKEN 123456789

## 具体配置

```yml
# 选择服务语言
language: node_js

# 版本
node_js: 8.12.0

# 缓存
cache:
  bundler: true
  yarn: true
  directories: node_modules

# 固定钩子 install
install: npm install

# 固定钩子 script
script: hexo clean && hexo g

deploy:
  # 取哪个文件的内容传
  local-dir: './public'
  # 使用 githubPage 服务
  provider: pages
  # 不删除内容，避免在 build 之后删除了想要上传的内容
  skip-cleanup: true
  # 你的 github 项目 personal access token
  github-token: ${ACCESS_TOKEN} # Set in the settings page of your repository, as a secure variable
  # 保存记录
  keep-history: true
  # 使用 github 的 name email 进行提交
  committer-from-gh: true
  # 提交到哪个分支，默认是 gh-pages
  target-branch: master
  # hexo branch 触发
  on:
    branch: hexo
```

## 其他

类似于 ci cd 的东西确实挺好用，比如加 eslint 检查，编译部署之类的功能。把这些都集成到 git push 操作上确实很方便。
唯一麻烦的一点就是现在这种工具太多了，而且针对 github gitlab 什么的不太一样。还需要一直学习啊

### 补充

最近 travis-ci 也进行了迁移，原来的 .org => .com ，然后也开始使用起了 github app，感觉完全强过了 circle-ci,
不过迁移需要发个邮件让 travis 他们开个迁移权限。。【找了好久】
