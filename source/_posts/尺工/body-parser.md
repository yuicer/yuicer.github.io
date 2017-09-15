---
title: body-parser
categories:
  - 尺工
 
date: 2017-08-15 10:36:49
---
<p></p>
<!-- more -->
## 前言
在从 vue-resource 转到 axios 的时候设置 application/form 格式的时候遇到了一些问题。

## axios
emmm,现在这玩意突然火起来就因为作者尤大的一句话，大意就是考虑到 vue 的生态组件，觉得没必要把 vue-resource 这个东西放进来，所以就决定不再去维护这玩意，然后建议大家去用
axios。然后大家都去了。

vue-resource躲在旁边: 明明是我先的。
。。
  
不过 axios 确实要强大点，毕竟支持 node 环境和浏览器环境发请求，虽然还有一些其他功能，不过感觉都没啥用.
axios 的用法和 vue-resource 用法一样。
```
axios.get('url',{params:{}}).then()
axios.post('rl',{}).then()
```
然后都可以设置 baseurl。
```
var instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
```
timeout 这个是指明在这个时间内还没返回这个请求就会被中止
  
## 使用问题
在使用 axios 的时候，它默认发的请求是 `application/json` 格式，而服务器识别的是 ` application/x-www-form-urlencoded`，如果服务器没有特殊处理是取不到 req.body 
所以这里就有两种策略，一种服务端做处理，一种客户端做处理。

### 客户端
客户端操作，官方给出了几种方法，下面是我觉得比较好点的
#### browser
```
var qs = require('qs');
axios.post('/foo', qs.stringify({ 'bar': 123 }));
```
依赖 qs 库
#### node
```
var querystring = require('querystring');
axios.post('http://something.com/', querystring.stringify({ foo: 'bar' }));
```
使用自有的模块

### 服务端
使用 body-parser 中间件
它是把服务端不识别的 application/json 转换成类 json 格式，然后再通过 JSON.stringfy() 转成 JSON 格式。最后再JSON.parse()转成对象。。比较绕。。
>  将不正确的json格式
   {mail:'b', password: 'bb'}
   装转为正式的json格式
   {"mail": "b", password: "bb"}
   
```
var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})
```
emmm,官方给的用法，注意下面的那个请求， body-parser 只是帮你转成了类 json 格式，还需要自己再去转。
	
