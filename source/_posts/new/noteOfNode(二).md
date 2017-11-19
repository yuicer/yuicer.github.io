---
title: noteOfNode(二)
categories:
  - 尺工
date: 2017-11-14 10:19:22
---
<p></p>
<!-- more -->

### 线程，进程
进程是qq，线程是好友窗口
单核cpu单线程，多核多线程(系统调度以线程时)
进程——资源分配的最小单位，线程——程序执行的最小单位

###. [package-lock.json](https://docs.npmjs.com/files/package-lock.json)
今天装 npm 包的时候突然出来了这个东西，查了一下是对 package.json 的一个补充，可以去更精准的限制包的版本。

### 回调
写爬虫的时候深感回调的博大精深。。。所以再回去研究研究回调。

1. promise
感觉就是个语法糖，还是回调的原理，只不过写法变的更好了
```
function getPromise(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(1)
            resolve(ms)
        }, ms);
    });
}
var promise = getPromise(100);
var promise_ = getPromise(2000);
var p = Promise.all([promise, promise_])
p.then(
    (value) => {
        console.log(value || 'compelete')
    },
    (error) => {
        console.log(error || 'error')
    }
)
```

2. generator
。。看不太懂，大概知道这个东西可以单步执行，yiled 同断点一样，通过 next 继续函数的执行，使用需配合 co 这个三方库

3. async/awiat
写法最简单
```
async function g() {
    try {
        var flag = await new Promise(function (resolve, reject) {
            setTimeout(() => {
                // resolve(2);
                reject(3)
                console.log(1)
            }, 1000);
        })
    } catch (err) {
        console.log(err)
    }
    console.log(flag)
    return 'done'
}

g().then(a => {
        console.log(a)
    },
    err => {
        console.log(err)
    }
)
```
await 后跟 promise 对象，跟一般对象没意义。
await 有返回值 flag，不过只返回 resolve 的情况，情况需使用 try catch 捕捉，或者对这个 promise 写 then(f1,f_err)
但当错误被 then 处理后 try catch 并不会触发。因为此时程序正确执行

async 函数返回的是一个 promise 对象，也通过 .then(f1,f2)可捕捉，函数里的 return 相当于 resolve()，函数里的错误会被传给 reject();














<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=1304127&auto=1&height=66"></iframe>