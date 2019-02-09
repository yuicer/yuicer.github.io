---
title: addEventListener
categories:
  - 尺工
date: 2018-04-09 14:30:43
---

<p></p>
<!-- more -->

<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523266053324&di=dc3b3322d6f6027c8cda7341accffbb9&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2F59380130478a537df2b4dd3c8947aeaf95e7b46e.jpg">

<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=453185038&auto=1&height=66"></iframe>

## 前言

冬去春来，这段时间真是发生了好多的事情，算是一个新的人生转折点了。换了新城市，新公司，新生活。体验到了北漂生活。
这 2，3 个月过的真是匆匆忙忙。

现在想做的事情有已经堆了有山一样高了，要时有更多的时间就好了

## addEventListener

这个方法算是最基本的，但是之前用到的时候还是有疑惑。。。在这里再总结整理下
基本结构`target.addEventListener(type, listener, options)`

> options 一个指定有关 listener 属性的可选参数对象。可用的选项如下：
> capture: Boolean，表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发。
> once: Boolean，表示 listener 在添加之后最多只调用一次。如果是 true， listener 会在其被调用之后自动移除。
> passive: Boolean，表示 listener 永远不会调用 preventDefault()。如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。
> mozSystemGroup: 只能在 XBL 或者是 Firefox' chrome 使用，这是个 Boolean，表示 listener 被添加到 system group。

这里对 capture 就和以前的 useCapture[boolean] 默认 false 值是一样的。都是捕获阶段触发,
once 就是这个绑定对事件只执行一次，执行之后就把解绑这个事件
passive 基本是为了提高流畅度，以滑动事件举例子。当绑定一个滑动事件之后，我在内部可能执行一段自己的代码，但是对于浏览器来说，它并不知道你的代码里面有没有使用 preventDeafault 事件来组织默认行为，所以浏览器会等待你的代码处理完之后在进行默认行为，这样会造成当你对逻辑很长，且没有使用 preventDeafault 时，浏览器会等待你执行完毕再去滑动，从而造成卡顿，而添加这个 passive 则会告诉浏览器我不会使用 preventDeafault ，从而让滚动这个默认行为不会去等待，也就不会卡顿。

> option 支持的安全检测
> 在旧版本的 DOM 的规定中， addEventListener()的第三个参数是一个布尔值表示是否在捕获阶段调用事件处理程序。随着时间的推移，很明显需要更多的选项。与其在方法之中添加更多参数（传递可选值将会变得异常复杂），倒不如把第三个参数改为一个包含了各种属性的对象，这些属性的值用来被配置删除事件侦听器的过程。
> 因为旧版本的浏览器（以及一些相对不算古老的）仍然假定第三个参数是布尔值，你需要编写一些代码来有效地处理这种情况。你可以对每一个你感兴趣的 options 值进行特性检测。

```
var passiveSupported = false;

try {
  var options = Object.defineProperty({}, "passive", {
    get: function() {
      passiveSupported = true;
    }
  });

  window.addEventListener("test", null, options);
} catch(err) {}
```

这段代码确实写的很有意思，突然联想到一个以前看到的有趣项目

**_[Can (a== 1 && a ==2 && a==3) ever evaluate to true?
](https://stackoverflow.com/questions/48270127/can-a-1-a-2-a-3-ever-evaluate-to-true)_**

 有一个回答就是使用 get 来实现的

```
var val = 0
Object.defineProperty(window,'a',{
  get:function(){
    return ++val
  }
})

if (a === 1 && a === 2 && a === 3)
  console.log('∑:）')
```

两者都是通过使用 get ，在 js 去检查目标元素的时候去改变元素来达到目标效果
在 addEventListener 中，如果浏览器支持 option 为对象的时候，就会去自动查看里面有没有目标选项 key 的 value，这里就是查看 options 对象的属性 capture once passive 是否存在。当查看 passive 的时候，就会触发对 passive 设置的 get 函数，从而得知浏览器是否支持 passive。
