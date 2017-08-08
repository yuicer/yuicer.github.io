---
title: canvas_hosisora
categories:
  - 尺工
  - 杂乱
  - 叹言
comments: false
date: 2017-03-16 23:49:00
---
<p></p>
<!-- more -->
## 前言
从最开始了解 canvas，到现在知道了 白鹭引擎 three.js webgl。越来越觉得前端的图形学方面很深啊。。以后说不定可以做动画做原生游戏【据说知乎上有人开始用来做图片文字游戏了。。】
## 星空 
适用于手机
[demo](http://yuicer.coding.me/hosisora/)
这个星空可以分为四部分。
1.渐变的夜空背景
2.绕屏幕中心旋转的星星
3.随机从右边生成的流星
4.循环控制

## 结构
首先用对象的写法，并分开定义数据和方法,这样一来思路就可以很清晰，每一帧之间直接用下一帧覆盖而不是清空，星星和流星都是有 new 和 draw 两个方法，loop 用 window.requestAnimationFrame 来循环进行帧绘制。
```
window.onload = function () {
    hoxisora.init()
}

var hoxisora = {
    canvas: {},
    ctx: {},
    width: {},
    height: {},
    //star
    star_count: 100,
    star_maxR: 2.2,
    star_speed: 200,
    stars: [],
    //meteor
    meteors: [],
    meteor_speed: 2,
    time: new Date(),
    init: function () {
    },
    new_star: function () {
    },
    new_meteor: function () {
    },
    loop: function () {
    },
    draw_bg: function () {
    },
    draw_star: function () {
    },
    draw_meteor: function () {    
    },
}
```

## 夜空
这个绘制很简单，运用 canvas 的线性渐变就能轻松的画出来。
```
 draw_bg: function () {
        var me = this,
            lineargradient = me.ctx.createLinearGradient(0, 0, 0, me.height);
        lineargradient.addColorStop(0, '#470F71');
        lineargradient.addColorStop(1, '#2C63D8');
        me.ctx.fillStyle = lineargradient;
        me.ctx.fillRect(0, 0, me.width, me.height);
    },
```
## 星星
主要问题是绕中心旋转以及旋转的时候全屏覆盖

首先随机生成星星的对象数组，保存其位置，大小，移动速度，注意这里星星的 x，y 坐标点，生成星星的范围导致绕中心旋转的时候是否会出现屏幕的部分没有星星，即星星图的中心并不是屏幕的中心。
<img src="http://olti9qjwg.bkt.clouddn.com/qiniu/svg/hoxi.svg">
星星的生成范围为
横坐标：[(x-y)/2,(x+y)/2]
纵坐标：[0,y]
```
 new_star: function () {
        var me = this;
        for (let i = 0; i < me.star_count; i++) {
            var a = {};
            a.x = Math.floor(Math.random() * me.height) - (me.height - me.width) / 2;
            a.y = Math.floor(Math.random() * me.height);
            a.r = Math.floor(Math.random() * me.star_maxR);
            a.speed = Math.floor(me.star_speed + me.star_speed * Math.random());
            me.stars.push(a);
        }
    },
```
save 和 restore 可以看成是新建图层和返回上一图层，translate 首先将中心移动到中点然后旋转当前画布【按时间去旋转】，不过这个时间的设定有个小bug，当一天过去时分秒毫秒都归零的时候旋转的角度会突变导致不平滑而产生卡帧的情况，也可以设到一点月或者年，一月或者一年过去的时候产生卡顿，旋转之后再将绘制相对坐标原点移回来绘制星星，这里星星采用圆点放射性渐变，注意最后 fillRect 生成的星星画布大小
```
   draw_star: function () {
        var me = this,
            stars_ = [];
        for (let i = 0; i < me.star_count; i++) {
            me.ctx.save();
            me.ctx.translate(me.width / 2, me.height / 2);
            let s0 = 2 * Math.PI / me.stars[i].speed * 60 * 60 * me.time.getHours();
            let s1 = 2 * Math.PI / me.stars[i].speed * 60 * me.time.getMinutes();
            let s2 = 2 * Math.PI / me.stars[i].speed * me.time.getSeconds();
            let s3 = 2 * Math.PI / (me.stars[i].speed * 1000) * me.time.getMilliseconds()
            me.ctx.rotate(s0 + s1 + s2 + s3);
            me.ctx.translate(-(me.width / 2), -(me.height / 2));
            stars_[i] = me.ctx.createRadialGradient(me.stars[i].x, me.stars[i].y, 0, me.stars[i].x, me.stars[i].y, me.stars[i].r);
            stars_[i].addColorStop(0, 'rgba(66,232,255,1)');
            stars_[i].addColorStop(0.5, 'rgba(66,232,255,.5)');
            stars_[i].addColorStop(1, 'rgba(66,232,255,0)');

            me.ctx.fillStyle = stars_[i];
            me.ctx.fillRect((me.width - me.height) / 2, 0, me.height, me.height);
            me.ctx.restore();
        }
    },
```
这里也可以去修改星星的亮度变化，给星星加上闪烁效果，
## 流星
主要问题是流星的随机生成【时间，位置，速度】和角度

首先流星的生成是要有时间间隔，这里采用随机数来产生
```
 let i = Math.random();
        if (i > 0.99) {
            me.new_meteor();
        }
```
这里注意流星的产生位置，首先是45度从右上到坐下，在屏幕中出现的范围设置为屏幕上边的[x/3,x],屏幕右边的[0,2y/3]
所以流星的实际画布位置，纵坐标为了保持是在画布外出现为 -90
<img src="http://olti9qjwg.bkt.clouddn.com/qiniu/svg/ryuusei.svg">
```
 new_meteor: function () {
        var me = this,
            meteor = {};
        meteor.x = Math.floor(me.width / 3 + (me.width / 3 + me.height) * Math.random());
        meteor.y = -90;
        meteor.speed = Math.floor(me.meteor_speed / 2 + (3 * me.meteor_speed / 2) * Math.random());
        console.log(meteor.speed)
        me.meteors.push(meteor);
    },
```
这里画流星用了线性渐变，先生成100的正方形，然后显示只显示长130，宽1。
```
  draw_meteor: function () {
        var me = this,
            meteor_ = [];
        for (let i = 0; i < me.meteors.length; i++) {
            me.ctx.save();
            meteor_[i] = me.ctx.createLinearGradient(0, 0, 0, 100); //长100的正方形渐变
            meteor_[i].addColorStop(1, 'rgba(66,232,255,.3)');
            meteor_[i].addColorStop(.7, 'rgba(66,232,255,.1)');
            meteor_[i].addColorStop(0, 'rgba(66,232,255,.0)');


            me.ctx.translate(me.meteors[i].x, me.meteors[i].y);
            me.meteors[i].x = me.meteors[i].x - me.meteors[i].speed;
            me.meteors[i].y = me.meteors[i].y + me.meteors[i].speed;
            me.ctx.rotate(Math.PI / 4)
            me.ctx.fillStyle = meteor_[i];
            me.ctx.fillRect(0, 0, 1, 130); //只显示宽10，长100的界面
            me.ctx.restore();
            if (me.meteors[i].x < -10 || me.meteors[i].y > me.height + 10) {
                me.meteors.splice(i, 1);
            }
        }
    },
```
## 循环
循环采用 window.requestAnimationFrame 
```
loop: function () {
        var me = hoxisora;
        me.time = new Date();
        me.draw_bg();
        me.draw_star();
        me.draw_meteor();

        // 随机触发流星
        let i = Math.random();
        if (i > 0.99) {
            me.new_meteor();
        }
        me.rAF = window.requestAnimationFrame(me.loop);
    },
```
## 手机端出现的bug
1.浮点数绘制抖动，闪烁，后来都改为整数。无法根除。。
2.星星数量多后浏览器卡，
3.在苹果机，星星数量会影响 requestAnimationFrame 的频率。导致动画全部变慢。
4.安卓机表现不知道为什么普遍比苹果机效果好。有可能和 requestAnimationFrame 有关。
5.ios 在 webview 里面，比如 app 里面或者微信，打开后再退回桌面【放到后台】，再进入网页的时候会卡掉，严重的崩溃。
