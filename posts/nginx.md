---
title: 'Nginx 常用配置'
date: '2022-02-08 12:37:03'
tags:
- Nginx
---

### 取消 SPA 项目 index.html 页面的缓存

```
location / {
    root /mnt/data/web/xxx/build;
    index index.html;
    try_files $uri /index.html;
    add_header Cache-Control "private, no-cache, no-store, must-revalidate";
    add_header Expires "Sat, 01 Jan 2000 00:00:00 GMT";
    add_header Pragma no-cache;
}
```
