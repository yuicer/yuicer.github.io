---
title: promise
categories:
  - 尺工
date: 2019-02-07 23:45:58
---

<p></p>
<!-- more -->

## promise

promise.then().catch().finally()

finally 有兼容，很多没有实现这个功能

当链式调用中没有参数【回调函数】时会返回传入的 promise 对象
，有【回调函数】作参数时会返回【一个返回值为回调函数 return 的值的 promise 对象】传给下一个链式调用

### 执行顺序

```js
setTimeout(() => {
  console.log(3)
}, 0)
Promise.resolve().then(() => {
  console.log(2)
})
console.log(1)

/*
 * 1
 * 2
 * 3
 */
```

执行顺序类似 宏任务 微任务 => 宏任务[异步] 微任务 [参考](https://github.com/creeperyang/blog/issues/21)

**promise 确实是异步，只是类似于一个微任务 micro task**

### microtask

promise.then
MutationObserver

**process.nextTick 执行在 microtask 之前，task 之后，它不是 microtask**

```
new Promise((res) => {
  console.log(1)
  res()
}).then(() => console.log(2))

process.nextTick(() => console.log(3))

// 132
```

### promise 链式调用返回值

**[primise 规范](https://promisesaplus.com/#point-26)**

- then must return a promise.

- promise2 = promise1.then(onFulfilled, onRejected);

  - If either onFulfilled or onRejected returns a value x, run the Promise Resolution Procedure [[Resolve]](promise2, x).
  - If either onFulfilled or onRejected throws an exception e, promise2 must be rejected with e as the reason.
  - If onFulfilled is not a function and promise1 is fulfilled, promise2 must be fulfilled with the same value as promise1.
  - If onRejected is not a function and promise1 is rejected, promise2 must be rejected with the same reason as promise1

### promise 兼容实现

查了一下有[文章](https://zhuanlan.zhihu.com/p/34421918)说是在执行 then 的时候会有一个 immediate 执行，利用 MutationObserver 这个去做检测
自己用 babel-pollyfill 看了一下，里面有这么一段代码，感觉这个 notify 方法就是用作 microtask / job 的。

```js
// Node.js
if (isNode) {
  notify = function() {
    process.nextTick(flush)
  }
  // browsers with MutationObserver
} else if (Observer) {
  var toggle = true
  var node = document.createTextNode('')
  new Observer(flush).observe(node, { characterData: true }) // eslint-disable-line no-new
  notify = function() {
    node.data = toggle = !toggle
  }
  // environments with maybe non-completely correct, but existent Promise
} else if (Promise && Promise.resolve) {
  var promise = Promise.resolve()
  notify = function() {
    promise.then(flush)
  }
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
} else {
  notify = function() {
    // strange IE + webpack dev server bug - use .call(global)
    macrotask.call(global, flush)
  }
}
```
