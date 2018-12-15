---
title: ECS
categories:
  - 尺工
 
date: 2017-08-07 17:58:57
---
<p></p>
<!-- more -->
## ECS
这是一种设计模式，主要用于游戏中
<img src="http://yuicer.com/images/photos/ow.png">

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

比如一个人物，一个怪物，假设需要新增一种怪物技能【冰冻】，那么 oop 的话除了要修改怪物类，还需要回去修改人物类，而 ecs 的话就可以直接增加一个 system（freeze），system (be freezed) 然后赋给怪物和人物就可以了，特别在有多角色的时候会方便很多