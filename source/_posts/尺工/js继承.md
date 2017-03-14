---
title: js继承
categories:
  - 尺工
comments: false
date: 2017-03-01 11:36:59
---
<p></p>
<!-- more -->
## es5 继承
es5 实质是先创造子类的实例对象 this，然后再将父类方法放到 this 上。
```
function Foo(v) {
    this.value = v
}
Foo.prototype = {
   	say: function() {
		console.log("Foo")
	},
	hi: function(){
		console.log("hi")
	}
};

function Bar(v,name) {
	Foo.call(this,v)
	this.name = name
}

// 设置Bar的prototype属性为Foo的实例对象
Bar.prototype = new Foo()
Bar.prototype = {
   	say: function() {
		console.log("Bar")
	}
};

var test = new Bar(2,"cat") // 创建Bar的一个新实例

```
## es6 继承
es6 实质是先创造父类的实例对象 this， 然后用子类的构造函数去修改 this
```
class Point{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}
	say(){
		console.log("I'm the point")
	}
	hi(){
		console.log("hi")
	}
}

class ColorPoint extends Point{
	constructor(x,y,color){
		super(x,y);
		this.color = color;
	}
	say(){
		super.say()
		console.log("with color")
	}
}
var c = new ColorPoint(1,1,'red')
c.say();
c.hi();
```
## 比较
。这还比较个啥，肯定新的好啊，原型继承调用父类同名方法都是个麻烦，而且实现逻辑复杂。es6 关键字 class extends 简直和 java 差不多了。装个 babel 愉快的用 es6 吧。