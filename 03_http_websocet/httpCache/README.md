# 强缓存策略

1. 直接从本地副本比对读取，不去请求服务器，返回状态码事 200
2. 可以设置有效期

## Http 1.0 Expires 过期时间

```javascript
//十秒后缓存过期
//缺点：设置在服务器端，会存在过期时间与客户端时间不统一，缓存过期设置失败。
res.setHeader("Expires", new Date(Date.now() + 10 * 1000).toUTCString());
```

## Http 1.1 cache-control

```javascript
//15秒过期,优先级高于 Expires
res.setHeader("cache-control", "max-age=15");
```

## 协商缓存

1. 设置 no-cache 和 no-store,本地缓存会被忽略，去服务器验证源码是否有更新，没有更新继续使用缓存，状态码返回 304。
2. last-modified/if-modified-since
3. 未过期状态码返回 304，过期正常重新返回 200

```javascript
res.setHeader("cache-control", "no-cache");
//再次请求时会，有if-modified-since
res.setHeader("last-modified", new Date().toUTCString());
if (
  new Date(req.headers["if-modified-since"]).getTime() + 8 * 1000 >
  Date.now()
) {
  console.log("协商缓存命中");
  res.statusCode = 304;
  res.end();
  return;
}
```

3. etag/If-None-Match
