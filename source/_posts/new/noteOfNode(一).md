---
title: noteOfNode(一)
categories:
  - 尺工
date: 2017-11-13 11:37:18
---
<p></p>
<!-- more -->

## 前言
最近做 [catice](yuicer.com/catice) 感觉差不多了，虽然2个做的都很糙，只能算是过一遍 api 做出来的东西。
然后现在把游戏稍微放一下，开始学习 node。很久之前就有开始看，不过也只是有一些初步的了解，看了些东西，没有实践。对于后端的很多概念和思想都不了解，现在感觉 node 和 js 真是两个语言。。

### CPU-bound(计算密集型) 和I/O bound(I/O密集型)
对于服务端服务来说，主要分两个类型，一个是需要大量计算，比如人脸识别，小数点精度10的计算以及 ai 智能等，另一个则是大量读取，比如 web 服务器，文件读取返回。
对于 node 来说，应该是属于 I/O bound

### 进程，线程
进程：qq，线程：某一个好友窗口
线程挂掉会导致进程挂
任务分配到多线程速度要比多进程快
单一进程（非主进程）不会导致其他进程挂掉


### 爬虫
爬虫作为上手 demo 真是好用，，又能锻炼又还比较有意思。。
写这个爬虫的时候也遇到了很多问题。
首先请求目标网页获取到返回的 html，并用 cheerio 解析，之后获取 img 标签的 src 属性。
node 对文件操作采用的是覆盖式，所以多图片的时候需要考虑命名问题。这里为了方便只获取了有 http 头的外链图片
这里踩的第一个坑就是他获取到的并不是真的传统的 dom 节点，而是它封装的格式，必须使用它的解析，而且普通循环对它也没用。。得用它的 each 方法才可以。
第二个坑是在 axios 请求数据回来之后的格式，需要增加一个 config `responseType: 'stream'`。。

#### bug
图片在下载之后会有几率随机出现某张（某几张）下载不完整，感觉应该是缓冲区的问题，同时多个 pipe 时出了错。再多去看看文档
另外此爬虫获取到的 html 为初始 html，即若有后来的数据注入生成的 img ，并不能取到。
某些网站做了反爬虫，多次获取会被禁。。。
某些情况下会报错`read ECONNRESET`，查了下这个应该是访问时连接断掉产生的错误，不知道有什么好的解决办法



完整代码
```
axios.get('https://targetWebsite.com/').then(
    (res) => {
        var imgs_store = [];
        var $ = cheerio.load(res.data);
        var imgs = $('img');
        imgs.each(function (i, e) {
            imgs_store.push($(e).attr("src"))
        });
        for (var i in imgs_store) {
            if (imgs_store[i].slice(0, 4) !== 'http') {
                imgs_store.splice(i, 1)
            }
        }
        for (let i = 0; i < imgs_store.length; i++) {
            axios.get(imgs_store[i], {
                    responseType: 'stream'
                })
                .then(
                    (res1) => {
                        res1.data.pipe(fs.createWriteStream('./img' + i + '.jpg'))
                    },
                    (res1) => {
                        console.log(err)
                    }
                )
        }
    },
    (res) => {
        console.log('error：' + res)
    }
)
```

-------------
为了尝试解决上次爬虫的图片加载失败，尝试每回进行一个读取操作，操作完成再进行下一个请求。本来考虑的是回调，但是感觉很麻烦所以用了递归函数去操作，虽然这次 http 请求是按次同步执行，但是感觉 pipe 的执行还是异步，所以又尝试给 pipe 加监听。
```
function DownLoad(i, src, max) {
    if (i == max)
        return;
    axios.get(src, {
            responseType: 'stream'
        })
        .then(
            (res1) => {
                res1.data.pipe(fs.createWriteStream('./img' + i + '.jpg'))
                res1.data.on('error', (err) => {
                    console.log('err:' + err)
                })
                res1.data.on('end', () => {
                    console.log('end:' + i)
                    DownLoad(i + 1, imgs_store[i + 1], max)
                });
            },
            (res1) => {
                console.log(res1)
            }
        )
}
```
然鹅。。。并没有什么用。。。我现在怀疑纯粹是网络原因，因为那个网站是搬用的 pixel 。。。
之后我又换成 lofter 的网址，试了两种方式都可以。

放点爬到的猫片
他喵的，竟然做了防盗链，访问403，我还是传七牛吧。

<img src="http://yuicer.com/images/photos/cat0.jpg">
<img src="http://yuicer.com/images/photos/cat1.jpg"> 
<img src="http://yuicer.com/images/photos/cat2.jpg"> 

