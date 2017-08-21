---
title: ECS
categories:
  - 尺工
comments: false
date: 2017-08-07 17:58:57
---
<p></p>
<!-- more -->
## ECS
这是一种设计模式，主要用于游戏中
<img src="http://olti9qjwg.bkt.clouddn.com/qiniu/img/photos/ow.png">
1. Entity
2. Component
3. System

## Entity
实体
这是一个物体，相当于一个人物
由多个 Component 组成

## Component
数据
这是一个部件，相当于手臂之类

## System 
行为
这是一个动作，相当于行走
操作多个 Component

ecs 的一个核心点就是*组件无函数，系统无状态，充分解耦*
这个模式的好处是更方便添加修改，比传统的 oop 更简单
比如一个勇者，一个怪物，oop 的话得去在勇者对象中写勇者受到这个怪物的技能会造成什么影响，如果再增加一个新怪物，又得回去修改勇者对象
ecs 的话就直接增加一个 system（另一种新技能），然后根据碰撞组件修改勇者的 component 就好