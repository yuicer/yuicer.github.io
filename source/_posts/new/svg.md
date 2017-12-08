---
title: svg
categories:
  - 尺工
date: 2017-12-8 18:47:55
---
<p></p>
<!-- more -->

<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=400 height=400 src="/demo/demo_17128"></iframe>
## svg线段动画

dasharray 将线段分为实线和虚线，通过合理设置实线虚线长可以实现动画
虚线根据需要设的大一点，这样使需要的线段图形部分全部为实线，通过动画实现线段的加载。
不过由于线段的设置原因，实际的动画时间可能不会是设置的动画时间，需要根据情况调整
可以配合另外的一些现代属性来进行调整

```css
#ani {
  animation: stroke 2s both infinite;
  stroke-dasharray: 0 200;
}
@keyframes stroke{100% {
  stroke-dasharray: 120 200;}
  }
}
```
## svg移动轨迹动画
svg 可以沿着某一路线进行移动，这一点是 css3 做不到的
animateMotion 中的 path 属性可以定义这一行为
其中 rotate 设置为 auto 后，可让图形沿切线移动
其他和 css 中的属性差不多

`<animateMotion repeatCount="indefinite" rotate="auto" path="M20,25 C 100,25 150,225, 200, 125" dur="4s" fill="freeze"></animateMotion>`

## svg use
svg 可以直接引用某一块而不用再复制一遍, use 标签里面填写其他 svg 的id就好，但是这个引用过来的元素无法被编辑。
```html
<svg width="40px" height="40px">
  <use xlink:href="#ani"/>
</svg>
```