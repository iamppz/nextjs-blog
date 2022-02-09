---
title: 'GitHub 创建 Tags'
date: '2022-01-02 23:35:33'
tags:
- Git
---
今天把[流程图设计器](https://github.com/joyceworks/flowchart-vue)新版本发布到 NPM 以后，突然想到一个问题：如何让用户快速找到特定版本的源代码呢？

其实很简单：
``` shell
git tag v1.0
git push origin --tags
```

这样只要用`git clone -b v1.0 https://github.com/yourname/repo.git`就可以下载v1.0版本的代码了。
