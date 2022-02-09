---
title: 'Nginx 启用 Gzip'
date: '2022-01-02 23:37:05'
tags:
- Nginx
- gzip
---
新写的一个React项目部署到生产环境以后发现首次加载时间有点久，打开Chrome DevTools发现静态资源1.4M。

翻了下资料，有启用SSR的，有使用React Loadable的，都需要时间去验证，其中最简单的办法是启用Nginx的Gzip：
1. 在`nginx.confg`中`server`节点下添加：
    ```
    gzip on;
    gzip_buffers 32 4k;
    gzip_comp_level 6;
    gzip_min_length 200;
    gzip_types text/css text/xml application/javascript;
    gzip_vary on;
    ```
2. 退出`nginx.conf`执行：
    ```shell
    nginx -s reload
    ```
刷新页面，可以看到DevTools里面的网络传输已经变小了很多(1.4MB => 280kB)。

> 可通过 HTTP 请求的响应头 `content-encoding: gzip` 确认已开启压缩。
