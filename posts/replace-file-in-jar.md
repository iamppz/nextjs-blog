---
title: '替换 jar 包中的文件'
date: '2022-01-24 17:23:51'
tags: 
- Java 
---
```shell
jar -tvf xx-0.0.1-SNAPSHOT.jar | grep form.text.js  # 查找文件在 jar 包中的位置
jar -xvf xx-0.0.1-SNAPSHOT.jar BOOT-INF/classes/static/js/function/workflow/form.text.js  # 解压单个文件
cp form.text.js BOOT-INF/classes/static/js/function/workflow/  # 将编辑后的文件覆盖到解压后的位置
jar -uvf xx-0.0.1-SNAPSHOT.jar BOOT-INF/classes/static/js/function/workflow/form.text.js  # 更新 jar 包中的文件
```
