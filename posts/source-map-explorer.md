---
title: 'Create React App 项目打包体积分析'
date: '2022-02-09 14:43:05'
tags:
- React.js
---
[source-map-explorer](https://github.com/danvk/source-map-explorer) 通过分析 sourcemap 文件生成 CRA 项目打包体积分析报告，效果如下图：

![image](/source-map-explorer/image.png)

### 安装与使用：

1. 添加项目依赖：
    ``` shell
    yarn add source-map-explorer
    ```

1. 在 `package.json` 的 `scripts` 中添加：
    ```
    "analyze": "source-map-explorer 'build/static/js/*.js'"
    ```

1. 在项目根目录的.env文件（如不存在可手动创建）中添加：
    ```
    GENERATE_SOURCEMAP=true
    ```
    来启用编译时生成 map 文件。

1. 执行命令：
    ``` shell
    yarn run build
    yarn run analyze
    ```
    
1. 执行完毕后会自动在浏览器中打开报告页面。
