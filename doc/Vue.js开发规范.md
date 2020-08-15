#Vue.js 开发规范

1. 基于组件化开发理解
2. 组件命名规范
3. 结构化规范
4. 注释规范
5. 编码规范

### 1. 基于组件化开发理解

##### 什么是组件？
组件其实就是页面组成的一部分，好比是电脑中的每一个元件（如硬盘、键盘、鼠标），它是一个具有独立的逻辑和功能或界面，同时又能根据规定的接口规则进行相互融化，变成一个完整的应用。
页面只不过是这样组件的容器，组件自由组合形成功能完整的界面，当不需要某个组件，或者想要替换某个组件时，可以随时进行替换和删除，而不影响整个应用的运行。前端组件化的核心思想就是将一个巨大复杂的东西拆分成粒度合理的小东西。

##### 组件化开发的好处
+ 提高开发效率
+ 方便重复使用
+ 简化调试步骤
+ 提升整个项目的可维护性
+ 便于协同开发
+ 使其高内聚，低耦合，达到分治与复用的目的。

##### 组件化和模块化的区别
组件化是从产品功能角度进行分割，模块化是从代码实现角度进行分割，模块化是组件化的前提和基础。

##### Vue组件化开发
单文件系统，样式局部作用域
基本组成结构：`<template/> <script/> <style scoped/>`
组件注册方式：

1. 公共组件全局注册
2. 其余组件局部注册

### 组件命名规范

命名可遵循以下规则：

1. 有意义的名词、简短、具有可读性
2. 以小写开头，采用短横线分割命名
3. 公共组件命名以公司名称简拼为命名空间
4. 文件夹命名主要以功能模块代表命名

同时还需要注意：必须符合自定义元素规范: 使用连字符分隔单词，切勿使用保留字。

### 结构化规范

##### 基于Vue-cli脚手架的结构基础划分
```
├── build                      # 构建相关
├── mock                       # 项目mock 模拟数据
├── plop-templates             # 基本模板
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 主题 字体等静态资源
│   ├── components             # 全局公用组件
│   ├── directive              # 全局指令
│   ├── filters                # 全局 filter
│   ├── icons                  # 项目所有 svg icons
│   ├── lang                   # 国际化 language
│   ├── layout                 # 全局 layout
│   ├── router                 # 路由
│   ├── store                  # 全局 store管理
│   ├── styles                 # 全局样式
│   ├── utils                  # 全局公用方法
│   ├── vendor                 # 公用vendor
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
│   └── permission.js          # 权限管理
├── tests                      # 测试
├── .env.xxx                   # 环境变量配置
├── .eslintrc.js               # eslint 配置项
├── .babelrc                   # babel-loader 配置
├── .travis.yml                # 自动化CI配置
├── vue.config.js              # vue-cli 配置
├── postcss.config.js          # postcss 配置
└── package.json               # package.json
```

##### Vue文件基本结构
```html
  <template>
    <div>
      <!--必须在div中编写页面-->
    </div>
  </template>

  <script>
    export default {
      components : {
      },
      data () {
        return {
        }
      },
      methods: {
      },
      mounted() {
      }
    }
  </script>

  <!--声明语言，并且添加scoped-->
  <style lang="less" scoped>
  </style>
```

##### Vue文件方法声明顺序

```
    - components
    - props
    - data
    - created
    - mounted
    - activited
    - update
    - beforeRouteUpdate
    - metods
    - filter
    - computed
    - watch
```


### 注释规范
代码注释在一个项目的后期维护中显的尤为重要，所以我们要为每一个被复用的组件编写组件使用说明，为组件中每一个方法编写方法说明。
以下情况，务必添加注释

1. 公共组件
2. 共通函数
2. 各组件中重要函数或者类说明
3. 复杂的业务逻辑处理说明
4. 特殊用途的变量、变量存在临界值、函数中使用的hack
5. 使用了某种算法或思路
6. 特殊情况的代码

##### 单行注释

普通方法一般使用单行注释，用`//`来说明该方法主要作用
```js
  // 取最大值
  function max(...){

  }
```

##### 多行注释
   组件使用说明，和调用说明
```
  /**
   * 组件名称
   * @author                    - 作者，建议
   * @date 2017-12-05 17:22:43  - 创建日期，可选
   * @param {Object} [title]    - 参数说明，必须
   * @param {String} [columns]  - 参数说明，必须
   * @example                   - 调用示例，必须
   *    <hbTable :title="title" :columns="columns" :tableData="tableData"></hbTable>
   */
```

### 编码规范
优秀的项目源码，即使是多人开发，看代码也如出一人之手。统一的编码规范，可使代码更易于阅读，易于理解，易于维护。
**尽量按照ESLint格式要求编写代码**

1. 使用ES6风格编码源码
   定义变量使用`let`
   定义常量使用`const`
   使用`export`、 `import`模块化
2. 组件 `props` 原子化
   提供默认值
   使用 `type` 属性校验类型
   使用 `props` 之前先检查该 `prop` 是否存在
3. 避免 `this.$parent`
4. 谨慎使用 `this.$refs`
5. 无需将 `this` 赋值给 `component` 变量
6. 调试信息`console.log()`、 `debugger` 使用完及时删除

