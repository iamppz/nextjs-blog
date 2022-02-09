---
title: '通过 Git Submodule 在 React.js 和 React Native 中共享代码'
date: '2022-01-05 16:58:48'
tags:
- React.js
- React Native
---
在开发 React.js 和 React Native 应用的过程中，有一个问题一直困扰着我：已知两个应用调用的后端 API、数据结构甚至业务逻辑代码超过 80% 都是相同的，差异几乎只存在于 UI 层——布局（View vs Div等）和平台专用逻辑（页面跳转、Swipe Action等）之间，如何做到代码最大程度的复用？

PC 端 React.js 应用目录结构如下（删减部分文件/目录）：

```
package.json
public
   |-- favicon.ico
src
   |-- App.tsx
   |-- component  # 组件
   |   |-- CascaderWrapper
   |   |-- DataForm
   |   |-- DataList.tsx
   |-- hooks
   |   |-- column.ts
   |-- index.css
   |-- index.tsx
   |-- page  # 页面
   |   |-- Login
   |   |   |-- index.tsx
   |   |   |-- schema.ts
   |   |   |-- util.ts
   |   |-- Recovery
   |   |   |-- index.less
   |   |   |-- index.tsx
   |   |-- Task
   |   |   |-- Form.tsx
   |   |   |-- List.tsx
   |   |   |-- index.tsx
   |   |   |-- schema.ts
   |   |   |-- util.ts
   |-- util  # 工具类
yarn.lock

```

移动端 React Native 应用目录结构如下（删减部分文件/目录）：

```
App.tsx
android
component  # 组件
   |-- Cascader
   |-- DataForm
   |-- DataList
hook
   |-- navigation.ts
index.js
ios
package.json
page  # 页面
   |-- Login
   |   |-- index.tsx
   |   |-- schema.ts
   |   |-- util.ts
   |-- Recovery.tsx
   |-- Task
   |   |-- DetailScreen.tsx
   |   |-- FormScreen.tsx
   |   |-- index.tsx
public
   |-- logo192.png
util  # 工具类
yarn.lock

```

可以看到，两个应用的目录结构类似，页面（`page`）和组件（`component`）目录中的页面和组件基本也都能一一对应。

开发初期，我的做法是在 `util`、`hook`、`constant` 等目录中分别建立 `universal` 文件夹，将跨平台复用代码移动到该目录下：

```
util  # 工具类
   |-- universal  # 跨平台共用
   |   |-- index.ts
   |-- axios.ts
   |-- message.ts
```

一端开发完之后，将代码手动复制粘贴到另一端的代码里。随着代码量的增长和目录结构复杂程度加剧，开始出现遗漏文件的情况，而且每个改动都要来回复制粘贴，这种机械劳动是非常难以接受的，于是开始着手研究代码复用的方案。

前端项目代码复用，最常见的方案就是搭建私有 NPM 仓库，各项目通过包引用来实现复用。

这个方案是首先被排除的。因为业务逻辑频繁增加，我需要频繁发布和更新 package，流程过于繁琐会消磨开发热情。此外 React 组件打包也是一个较繁琐的体力劳动（虽然有[脚手架](https://github.com/transitive-bullshit/create-react-library)可简化此工作）。最后基础设施也需要保持精简，避免太高的维护成本、节省服务器资源，依赖的东西越多，整体的系统就越脆弱，可迁移性越低。

第二类方案是 Bit、Lerna 等技术，在考虑到费用、复杂度以及对现有项目的兼容性之后，也被排除。

最后决定通过 Git Submodule 来实现代码的共享，这个方案其实就是通过 Git Submodule 将共用代码目录挂载到各项目下，各项目只需将导入语句路径修改一下即可，无论原理还是改造都非常简（jian）单（lou）。

具体实施步骤如下：

1. 将 `universal` 目录中代码移动到新的 `commons`（git@github.com:xxx/commons.git） 项目中，`commons` 项目中代码不引用任何外部代码，其目录结构如下（删减了部分文件/目录）：

```
README.MD
application
   |-- cmd
   |   |-- UserRecoveryCommand.ts
   |   |-- service
   |   |   |-- TaskCategoryCommandService.ts
   |   |   |-- TaskCommandService.ts
   |-- qry
   |   |-- service
   |   |   |-- TaskCategoryQueryService.ts
   |   |   |-- TaskQueryService.ts
constant
   |-- index.ts
   |-- ui.ts
domain
   |-- task.ts
enum.ts
hook
   |-- index.ts
image
   |-- flat-color-icons
schema
   |-- index.ts
   |-- server.ts
   |-- task.ts
util
   |-- data
   |   |-- index.ts
   |-- dynamic.ts
   |-- index.ts
   |-- number.ts
   |-- reducer.ts
   |-- tree.ts
   |-- workflow.ts
```

2. 清理移动端（和 PC 端）项目中多余的代码文件，为项目添加子模块：

```shell
git submodule add git@github.com:xxx/commons.git src/commons  # PC 端
git submodule add git@github.com:xxx/commons.git commons  # 移动端
```

> 此步会将 `commons` 下载到当前项目的 `src/commons`（和 `commons`）下。

3. 将移动端（和 PC 端）项目中相关引用重定向到新增的 `commons` 目录。

4. 启动项目进行确认。

如此，就完成了简单的改造。

> 注：

> 对于 Git Submodule 的常用操作不多赘述，可自行搜索或参考 https://www.jianshu.com/p/f8a55b972972/ 。
