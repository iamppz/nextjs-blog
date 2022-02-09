---
title: '在 Nginx 中启用 HTTP2'
date: '2022-01-27 15:44:14'
tags:
- Nginx
---

1. 执行命令查看 Nginx 当前安装版本是否支持 HTTP2:

	```shell
	nginx -V
	```

	结果中包含 `with-http_v2_module` 则表示支持。


2. 在配置文件中启用 HTTP2:

    将配置文件中的 `listen 端口号 ssl;` 修改为 `listen 443 ssl http2;`（尽管HTTP2并不要求使用加密，但是对于现代浏览器来说如Google Chrome 和 Mozilla Firefox默认HTTP2和HTTPS是一起使用的，所以如果你想配置HTTP2的话，还是需要同时配置SSL）。

### 补充

1. HTTP2 的 Request header 是大小写不敏感的，部分大小写敏感的服务端可能会出现问题，Java 可参考 https://javaee.github.io/javaee-spec/javadocs/javax/servlet/http/HttpServletRequest.html#getHeader-java.lang.String- 。

## 参考

- [1] [轻松让你的NGINX服务器支持HTTP2协议](https://www.nginx.org.cn/article/detail/530)
