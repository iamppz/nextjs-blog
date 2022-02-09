---
title: 'Spring Boot 启用 Gzip'
date: '2022-01-27 15:34:05'
tags: 
- Java
- Spring Boot
- gzip
---
> Spring Boot 2.6.0 版本验证有效。

在`application.properties`中添加：
```
server.compression.enabled=true
server.compression.mime-types=application/json
```

> 可通过 HTTP 请求的响应头 `content-encoding: gzip` 确认已开启压缩。
