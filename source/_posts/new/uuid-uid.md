---
title: uuid-uid
categories:
  - 尺工
date: 2018-03-21 17:04:04
---
<p></p>
<!-- more -->

## 前言
作统计的时候看到 pv 和 uv，很奇怪 pv 到底是怎么算出来的，于是就查了下

## uid uuid
uid: User Identifier

uuid: Universally Unique Identifier

### uid
#### cookie/session
uid 的实现，一般来说 uid 都是在用户登陆成功后，服务端会生成一个 uid 用来标志这个用户并返回给客户端，写进 cookie。同时在服务端维护一个数据表存储这个 uid。当用户再次访问时会自动带上这个已经存储在本地的 uid 一并发送给服务端，这样就实现了有状态的登陆控制。

比如拿 github 来做个实验，首次访问时状态是未登录的。它会在 cookie 和 localhost 都写上标志量。再登陆后会设置很多标志，最主要的用户标志就是 user_session 。

另外找了下浏览器端有没有办法自己生成标志，因为上面的标志一旦 cookie 被清除就作废。很不稳定
然而找到的感觉都是一些玄学方法。。。都属于是那种取巧的，基本上就是疯狂找出在浏览器中能被js脚本检测数的不同设备之间可能会有的不同标志，然后再组合到一起提高准确率。比如下面说到的一些 —— 来自[fingerprintjs2](https://github.com/Valve/fingerprintjs2)
> 用户代理
语言
颜色深度
屏幕分辨率
时区
有会话存储与否
有本地存储或没有
索引了数据库
具有IE特定的'AddBehavior'
已打开数据库
CPU类
平台
DoNotTrack或不
使用Flash实现的已安装字体的完整列表（维护其顺序，从而增加熵）。
使用JS / CSS（侧通道技术）检测到的已安装字体列表可以检测多达500个安装的字体，而无需使用闪光灯
帆布指纹
WebGL指纹识别
插件（包含IE）
是否安装AdBlock
用户是否篡改了其语言1
用户是否篡改了其屏幕分辨率1
用户是否篡改了其操作系统1
用户是否篡改了浏览器1
触摸屏检测和功能
像素比例
系统用户代理可用的逻辑处理器总数。
设备内存

觉的这个东西很不稳。。。。。。

### uuid
uuid 这个已经有了成熟的方案规范，基本都有库来实现

UUID Version 1：基于时间的UUID
基于时间的UUID通过计算当前时间戳、随机数和机器MAC地址得到。由于在算法中使用了MAC地址，这个版本的UUID可以保证在全球范围的唯一性。但与此同时，使用MAC地址会带来安全性问题，这就是这个版本UUID受到批评的地方。如果应用只是在局域网中使用，也可以使用退化的算法，以IP地址来代替MAC地址－－Java的UUID往往是这样实现的（当然也考虑了获取MAC的难度）。

UUID Version 2：DCE安全的UUID
DCE（Distributed Computing Environment）安全的UUID和基于时间的UUID算法相同，但会把时间戳的前4位置换为POSIX的UID或GID。这个版本的UUID在实际中较少用到。

UUID Version 3：基于名字的UUID（MD5）
基于名字的UUID通过计算名字和名字空间的MD5散列值得到。这个版本的UUID保证了：相同名字空间中不同名字生成的UUID的唯一性；不同名字空间中的UUID的唯一性；相同名字空间中相同名字的UUID重复生成是相同的。

UUID Version 4：随机UUID
根据随机数，或者伪随机数生成UUID。这种UUID产生重复的概率是可以计算出来的，但随机的东西就像是买彩票：你指望它发财是不可能的，但狗屎运通常会在不经意中到来。

UUID Version 5：基于名字的UUID（SHA1）
和版本3的UUID算法类似，只是散列值计算使用SHA1（Secure Hash Algorithm 1）算法。
