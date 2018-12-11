---
title: vue-typescript
categories:
  - 尺工
date: 2018-12-11 18:54:05
---

<p></p>
<!-- more -->

### 前言

最近有一个写新的较大项目的机会【以前一直写活动。。。】，所以想折腾折腾学点新东西，本来是想用 react ，但是最后被叫停了。
然后又回归到 vue 来，想着 react 用不了，ts 总能折腾一下。所以开始了踩坑之旅

### 项目搭建配置

这一块倒是不需要特别费心，@vue/cli3 已经对这一块做好了处理，不过得注意 ts 支持在 vue 2.5 以上
或者不想用 cli ，想自己配置 webpack 的也可以参考[这篇文章](https://github.com/Microsoft/TypeScript-Vue-Starter)

### 坑

1. `vue-property-decorator` 使用报错

```ts
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class HelloWorld extends Vue {
  @Prop(String) msg!: string
  mounted() {
    console.log(this.msg)
  }
}
```

@Component 这一句不知为何会报错，查了之后据说是一个 [bug](https://github.com/vuejs/vue-class-component/issues/294)，以后估计会解决，现在的方案是在 tsconfig.json 中添加如下代码

```json
{
  "compilerOptions":{
     "strictFunctionTypes": false,
     ...
  }
}
```

2. 绑定在 vue 实例上的对象声明类型
   在 `some.d.ts` 里手动声明

```ts
import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $axios: object
  }
}
```

3. 新的写法。。。
   vue 为了保持 ts 的对象风格，增加了额外的两个插件

[vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)
[vue-class-component](https://github.com/vuejs/vue-class-component)

so。。。vue 的用法基本上都得重新学了
