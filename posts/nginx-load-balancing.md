---
title: 'Nginx 负载均衡'
date: '2022-01-28 10:07:51'
tags:
- Nginx
---

```nginx
upstream blog {
    server 127.0.0.1:80 max_fails=0 fail_timeout=0;  # max_fails: 最大失败次数，达到阈值将 server 设置为不可用，休眠 fail_timeout 时间，当 max_fails 为 0 时不再进行失败计数
    server 172.17.33.27:80 max_fails=0 backup fail_timeout=0;  # backup: 当上一个 server 失败时将请求转发该 server 进行重试
    keepalive 4000;  # 缓存连接数，当缓存连接数达到上限时，按活跃时间关闭最长时间未使用（least recently）的一个连接
}

server {
	server_name blog.joyceworks.com;

	location / {
	    proxy_pass http://blog;
	    proxy_set_header X-Real-IP $remote_addr;
	    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	    proxy_http_version 1.1;  # 固定配置（For HTTP, the proxy_http_version directive should be set to “1.1” and the “Connection” header field should be cleared）
	    proxy_set_header Connection "";  # 固定配置（For HTTP, the proxy_http_version directive should be set to “1.1” and the “Connection” header field should be cleared）
	    proxy_read_timeout 300s;
	}
}
```

## 参考

- [1] [Module ngx_http_upstream_module](https://nginx.org/en/docs/http/ngx_http_upstream_module.html)
