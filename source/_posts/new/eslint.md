---
title: eslint
categories:
  - 尺工
date: 2017-12-07 09:34:20
---
<p></p>
<!-- more -->

## 前言
最近写服务端的时候深感 jshint 不好用。所以换上了 eslint 。

## 使用
一般使用
1. 全局安装 eslint
2. eslint --init
3. eslint your.js

vsc下需要安装插件eslint包
使用 vue 的话需要下载`eslint-plugin-html`,最简单就把脚手架那一套拿过来，开箱即用
编辑器设置如下
```
"eslint.validate": [
    "javascript",
    "javascriptreact",
    "vue",
    "html"
  ]
```
## 规则
规则这个东西嘛，，，人多说了算。。
eslint --int 会提示你几种方法，
```
Answer questions about your style
Use a popular style guide
Inspect your Javascript file(s)
```
第一个是比较简单的设置，问你几个问题生成对应的简单配置
第二个用别人家的，会有三种模板选择
```
standard
google
airbnb
```
从上到下依次变严，一般应该用 standard 就可以
第三个是检测你的文件生成对应规则。不过我没试过

### 自定义
对于生成的配置文件进行修改也比较简单
```
module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    rules: {
        'curly': 'off',
        'no-useless-escape': 'off',
        'no-inner-declarations': 'off',
        'spaced-comment': 'off',
        'camelcase': 'off',
        'space-before-function-paren': 'off',
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
}

```
超简版
```
{
    "extends": [
        "standard",
        "eslint:recommended"
    ],
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "eol-last": "off"
    }
}
```
vsc 对eslint支持很好，对有错误的地方说明都很清楚，实在不知道意思也可以拿这关键词去[eslint官网](https://eslint.org/docs/rules/)查，也有小提示可以自动帮助修复

如果想忽略某些文件的话可以添加 eslintignore 文件，和 gitignore 差不多

之后就开始愉快的受难之旅吧 ∑:(
