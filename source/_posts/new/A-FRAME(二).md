---
title: A-FRAME(二)
categories:
  - 尺工
comments: false
date: 2017-09-13 15:58:56
---
<p></p>
<!-- more -->

## 方法
```
AFRAME.registerComponent('bar', {
  schema: {
    size: {type: 'number', default: 5}
  }
  init(){},
  update(){},
  remove(){},
  play(){},
  pause(){},
  tick(){}
}
```

### schema
只是用来检测数据，和 mongoose 的 schema 差不多。
type 有很多种，不过不支持对象类型，当传的数据类型不对时会报错。
default 是默认值，如果不传值的时候默认按这个。

### init
初始化时调用一次

### update
初始化或属性更新的时候调用

### remove
属性被移除【通过 removeAttribute removeChild】

### tick
场景渲染的每一帧调用

基本都是字面意思。。不写了
### 其他

1. 系统间依赖顺序
```
AFRAME.registerComponent('a', {
  dependencies: ['b']
});
// Initializes second.
AFRAME.registerComponent('b', {
  dependencies: ['c']
});
```

2. 多个实例
```
AFRAME.registerComponent('foo', {
  multiple: true,
  // ...
});
```
默认只能有一个实例，开启后可增加多个，如 float__1  float__2，可通过 id 判断区分

3. 获取组件
```
var components = document.querySelector('[components_name]').components.components_name;
```

## 属性

### this.data
获取 schema 中的数据
### this.el
获取绑定的 dom
