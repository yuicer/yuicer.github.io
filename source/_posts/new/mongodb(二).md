---
title: mongodb(二)
categories:
  - 尺工
comments: false
date: 2017-06-12 15:12:52
---
<p></p>
<!-- more -->
## 概述
1. nosql 
这是个和口号一样的玩意，和 sql 没啥关系，sql 只是一个查询语言，mysql 才是关系型数据库的一个代表。nosql 并非就没有 sql 查询，它也不代表非关系型数据库。
非关系数据库在社交应用，聊天通讯等使用较多。

2. mongoose
elegant mongodb object modeling for node.js
这是官方的介绍，优雅。。

个人理解它是相当于对 mongodb 做了一个中间层，对数据进行处理。

## 使用
1. 安装连接
npm install mongoose
在原来的 express 框架中做些修改。我采用的是如下结构
根目录下新建文件夹 model 来建立 mongoose 结构
```
var mongoose = require('mongoose'),
	con = mongoose.createConnection('mongodb://localhost:27017/test'),
	UsersSchema = new mongoose.Schema({
		name: String
	}, {
		versionKey: false
	});

var users = con.model('users', UsersSchema)

module.exports = users
```
首先引入依赖之后连接数据库，本地 27017 端口下的 test 数据库
这里使用的是 createConnection(),它和文档上使用的有区别。
```
mongoose.connect('mongodb://user:pass@localhost:port/database');
```
文档中的是建立的是默认的数据库连接，之后建立 model 也是用的这个默认，
```
var Tank = mongoose.model('Tank', schema);

```
这样就可以连接多个数据库做不同处理

2. schema,model,documents
schema 我理解它为一个抽象的对数据定义的结构，它本身有可以定义许多方法。但本身并不能进行操作
model 是从它这里继承下来，并与数据库绑定，相当于 collections，可进行操作
从 model 中 new 出来的实体对象 documents 则相当于是每一条数据。

3. 数据验证
```
var mongoose = require('mongoose'),
	con = mongoose.createConnection('mongodb://10.10.1.3:27017/test'),
	UsersSchema = new mongoose.Schema({
		name: {
			type: String,
			required: [true, 'name is required'],
			validate: {
				validator: function (v) {
					return typeof v == 'string'
				},
				message: 'name is not a string'
			}
		},
		age: {
			type: Number,
			required: [true, 'age is required'],
			max: 12,
			min:0
		}
	}, {
		versionKey: false 		//取消版本锁，否则每条数据都会有个 _v 字段
	});

var users = con.model('users', UsersSchema)

module.exports = users
```
以上建立了一个简单的 users 集合。
以上定义了一个具有简单验证的 schema，如果出错，会在 err.errors 中显示错误信息
type: 确定参数为指定类型，不是则报错，【为string的时候会自动把其他类型进行转换】
required: 此字段为必须
validata: 自定义验证函数，当返回为 false 时报错，附带 message 字段

number类型特有min,max，可确定范围
string类型特有 enum, match, maxlength, minlength 
enum: 确定字符串为给定枚举中的
match: 正则匹配

### bug
在 mongoose 中，你给 model 定的名字会自动给你转成复数形式，【什么坑爹玩意】。除非你显示声明
```
var schema = new Schema({ name: String }, { collection: 'actor' });

// or

schema.set('collection', 'actor');

// or


var M = mongoose.model('Actor', schema, 'Actor');
```













