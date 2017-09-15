---
title: es6整理
categories:
  - 尺工
 
date: 2017-02-03 17:06:01
---
<p></p>
<!-- more -->
## 前言
最近es6很火，以至于有说这是面试中的一环了，所以在这里整理整理关于 es6 的东西，浏览器的支持可能还不是能在生产中用的感觉，可以下载 bable，作为 js 的 loader 来解析写的 es6 语法。
## let
let 是新增的变量声明标志，它和 var 有什么不同呢？
### let是一个块级作用变量
就是 **{}** 这个东西，它只在自己声明的块中可用，而 var 则是在声明的函数区域可用，下面附上一个简明易懂的例子
```
(function () {
	if (1) {
		let a1 = "a1"
		var a2 = "a2"
		console.log(a1, a2)
	}
	try {
		console.log(a1, a2)
	} catch (error) {
		console.log("let不能在块作用域外使用")
	}

})()
```
用这个特性去解决循环闭包问题
**得到数组全是5**
```
function box(){
    var arr = [];
    for(var i=0;i<5;i++){
        arr[i] = function(){
            return i;                            
        }                                        
    }                                            
    return arr;
}
```
**解决将 var i 改为 let i即可，因为原先的所有赋值都指向的是一个唯一 i，改后每次块作用域内的 i 都不同了。for 看作每一次循环重新定义**
这里用到了另一个特性，
### let 不能重复定义
```
var a = 1;
var a = 2; // ok

let b = 1;
let b = 2;// error
```


所以上面解决闭包的原理如下
```
(function(){
	if(1){
		var a = 1;
		let b = 1;
	}
	
	if(1){
		var a = 2; // 和上面的 a 是同一个，跨作用块重复声明了。
		let b = 2; // 和上面的 b 不是同一个
	}
})()
```

### let 不存在变量提升

这个直接给个例子吧
```
(function () {
	try {
		console.log(a2)
		console.log(a1)
		let a1 = "a1"
		var a2 = "a2"
	} catch (error) {
		console.log("let没有变量提升")
	}

})()
```
所谓的变量提升就是指 `var a2 = "a2"` 会被这样解析，首先将 var a2; 这句提到函数开头，然后再原本的地方进行赋值
### let 不能给window绑上属性
```
var a = 1;
let b = 2;

window.a // 1
window.b // undefined
```
## const
常量，不可被改变，但注意对象和数组能够增减属性、值








<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=39122297&auto=1&height=66"></iframe>