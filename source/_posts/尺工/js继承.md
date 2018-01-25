---
title: js继承
categories:
  - 尺工
 
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

function Bar(value,name) {
	this.name = name
	Foo.call(this,value)
}
var test = new Bar(2,"cat") // 创建Bar的一个新实例
```
####　如果设置Bar的 prototype 属性为 Foo 的构造函数
Bar.prototype = new Foo()

这时　new Bar() 就会直接使用 new For()，虽然确实继承了 prototype 方法，但是 Bar 构造函数就会被忽略，this.name 不会被挂载
所以需要加上 Bar.prototype.constructor = Bar

或者直接
Bar.prototype = Foo.prototype

这里子类的 prototype 其实是父类的 prototype 的引用，所以修改子类的 prototype 也会修改父类的，所以可以采用浅/深复制来隔离开来

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