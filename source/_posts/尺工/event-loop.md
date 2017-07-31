---
title: event_loop
categories:
  - 尺工
comments: false
date: 2017-03-07 10:58:28
---
<p></p>
<!-- more -->
## 前言
最近又遇到了当异步事件存在时，程序的执行顺序到底是怎么样的这个问题。所以再次去了解了事件循环机制。主要参考，阮大神的博客
## js单线程
js 是    一个单线程的语言，据说因为设计之初考虑到如果同时有一个获取节点和删除节点的操作，到底谁会被先执行。另外下面有这样一个例子可以证明
```
setTimeout(function(){console.log(1)},5)
while(true){}
```
这个例子中 1 永远不会被打印。原因请往下看

## event loop
事件驱动的浏览器是多线程的，js 为处理这些多线程就使用了事件循环机制。
首先明确 2 个概念
1.函数调用形成堆栈
2.待处理的消息形成任务队列【异步操作】

把 js 的运行想象成先编译后执行。这里以 setTimeout 来代替事件【click，mouseover等】
```
function f(b){
  setTimeout(function(){console.log(2)},0)
  console.log(b)
  return b+35;
}

function g(x){
  setTimeout(function(){console.log(1)},0)
  console.log(x)
  return f(4*x);
}

g(5);
```
编译
首先函数 g 进栈，然后调用 f 进栈，再进栈的过程中，遇到 setTimeout 会将它放入任务队列

执行
首先在执行栈内的任务会被执行，当执行栈为空是会查询任务队列内的消息是否处理完【比如 setTimeout 设置5S延时】，如果执行完则去执行任务队列中的第一个消息。如此循环。
```
while(queue.waitForMessage()){
  queue.processNextMessage();
}
```

所以以上的输出结果
```
5
20
55
1
2
```
所以，setTimeout 设置的延迟时间并不是准确时间，只是可能被执行的最小延迟，因为在它之前执行的任务队列中的消息执行时会阻塞它的执行，它必须等到之前的消息执行完才能开始执行
