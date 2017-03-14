---
title: js小知识
categories:
  - 尺工
comments: false
date: 2016-12-20 14:47:58
---
<p></p>
<!-- more -->
**强烈推荐**
[javascript秘密花园](https://bonsaiden.github.io/JavaScript-Garden/zh/)
### undefined null 不能看作对象，其他都可做对象

### 变量做属性名
```
var A = {one : 1}
A.one // 1
var b = "one"
A.b // undefined
A[b] // 1
```
### 3种情况循环
```
var a = 2, flag = 0;
for(let i = 0, i < 100,i++){
	flag = i % a;
	if(flag == 0)
		dosomething
	else if(flag == 0)
		dosomething
	else if(flag == 0)
		dosomething
}
```
### 字符串转换为数字
```
+'010' === 10
Number('010') === 10
parseInt('010', 10) === 10  // 用来转换为整数

+'010.2' === 10.2
Number('010.2') === 10.2
parseInt('010.2', 10) === 10
```
常用转换
'' + 10 === '10'; // true
+'10' === 10; // true
### 定时器
setTimeout 执行的时候this指向的是windos对象，
```
var t = setInterval(function(){},1000)
clearInterval(t);
```	
### 获取元素样式
1.获取 dom 节点后，dom.style 进行赋值，但是这是改的html的行内样式。
2.getComputedStyle()
getComputedStyle是一个可以获取当前元素所有最终使用的CSS属性值。
语法如下：

        window.getComputedStyle("元素", "伪类");
这个方法接受两个参数：要取得计算样式的元素和一个伪元素字符串（例如“:before”） 。如果不需要伪元素信息，第二个参数可以是null。也可以通过document.defaultView.getComputedStyle("元素", "伪类");来使用
例子：

        var test = document.getElementById("test"),
        demo = window.getComputedStyle(test, null); 
        //获取节点的color
         demo.color 
		
### 避免js堵塞
1.XHR注入：就是用ajax异步请求同域包含脚本的文件，然后将返回的字符串转化为脚本使用，该方法不会造成页面渲染和onload事件的阻塞，因为是异步处理，推荐使用。

2.iframe注入：加载一个iframe框架，通过使用iframe框架中的脚本来避免src方式加载脚本的阻塞，但是iframe元素开销较大，不推荐。

3.DOM注入：就是创建script元素，通过制定该元素的src并放入DOM树中，根据该语句书写的文字不同，会造成渲染或onload事件的阻塞。

4. document.write方法：在JS脚本中使用document.write('<script>XXX</script>');这种方法简单粗暴，但是它仍然会造成阻塞，所改变的只是什么时候阻塞。
### dom操作
dom 操作费时费力，尽量不用

DOM(Document Object Model/文档对象模型)是针对HTML和XML文档的一个API。
DOM 节点树：在文档中出现的空格、回车、标签、注释、文本、doctype、标签等都属于DOM节点。

操作 DOM 节点的方式无非就是：创建、添加(插入)、移除、替换、查找(获取)、克隆 DOM 节点。

创建文本节点：var newText = document.createTextNode('文本节点');
创建标签节点：var newNode = document.createElement('div');

添加(插入)子节点至末尾：父节点.appendChild(子节点);
添加(插入)子节点至某节点前：父节点.insertBefore(子节点, 某节点);

移除子节点：父节点.removeChild(子节点);

替换节点：父节点.replaceChild(替换后的节点, 替换前的节点);

查找(获取)节点：
查找(获取)所有子节点：父节点.childNodes
查找(获取)所有是标签类型的子节点：父节点.children
查找(获取)下一个兄弟节点：某节点.nextSibling
查找(获取)上一个兄弟节点：某节点.previousSibling
查找(获取)父节点：子节点.parentNode
查找(获取)第一个子节点：父节点.firstChild
查找(获取)最后一个子节点：父节点.lastChild