---
title: npm发布
categories:
  - 尺工
date: 2018-08-02 10:23:37
---
<p></p>
<!-- more -->

## 前言
代码写多了之后就会自然对有积累，但是积累需要一个地方，最以前是在 github 中放在一个公共文件夹里，然后 clone 下来之后把需要对代码复制粘贴到需要对地方，但是这么做会比较麻烦，而且有很大对缺陷是不好管理版本，只能通过打 tag 打方式来进行。所以决定还是放在 npm 上。

## npm发布
[文档](https://docs.npmjs.com/getting-started/publishing-npm-packages)

npm 除了通常用打 npm install npm uninstall 之外还有许多功能。比如直接发布一个包到 npm 上供大家下载使用。
具体步骤

### 注册用户
`npm add user` 或者去 npm 官网上注册

### 登陆
`npm login`

### 编写需要上传的库
`npm init --yes` 创建 package.json 文件
```json
{
  "name": "ttt",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```
这里简单介绍一下字段作用
* name ： npm发布包的名字
* version ： npm版本标志
* description ： npm发布之后在别人可以看到的描述，如果没有则会从 readme 中选取
* main ： 文件入口
* scripts ： 运行命令
* keywords ： npm 上搜索的关键词
* author ： 作者简介，联系方式等
* license ： 版权方式

其他还有很多字段，[文档](https://docs.npmjs.com/files/package.json)

#### name/scope
name 字段需要注意的是不能重复，如果已经在 npm 上有人发布了同名的包就会发布失败。
为了避免这个问题 npm 有 scoped 这个解决方法，每个人都有自己的一个 @scope[@username]，既在每个人下面新增加一个层级。此时 name 字段需要写成 `@yuicer/package` ，下载的时候同样也需要 `npm i @yucier/package` ，此时在 node_modules 下面的目录会变成 `yuicer/package` 即多了一层 scoped 目录，所以引用的时候也是需要加上这个 scoped 

npm init --scope=yuicer 可以自动生成 name 字段
scoped package 默认是为私人的，需要是付费用户才能使用，不过可以手动声明它是公用包
`npm publish --access=public`


#### version
version 字段用来管理版本。有几个常用命令如下，以初始版本 1.0.0 举例
`npm verison patch`  更新版本为 1.0.1
`npm version minor`  更新版本为 1.1.0
`npm version major`  更新版本为 2.0.0
