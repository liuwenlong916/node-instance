# TCP 协议 即时聊天

# [HTTP 协议](https://www.processon.com/view/link/5ec52841e0b34d5f261e14e0#map)

1. 观察 HTTP 协议 curl -v http://www.baidu.com=

TODO 待补充

# 跨域

1. https/http
2. 域名不一致
3. 端口不一致，都会导致跨域，不同源

# 同源策略

## 第一层封印(端口不一致)

1. 指定 axios 访问域名: axios.defaults.baseURL = 'http://localhost:4000'
2. 后端允许返回设置 head:res.setHeader('Access-Control-Allow-Origin',''http://localhost:3000)
3. 协议(http/https)、url、端口缺一不可

## 第二层封印(预检请求，option 请求)

预检请求：区分简单请求，使用非正常报头

1. 请求时 header 添加 x-token{headers: {"X-Token": "Tom",},}
2. 解决:添加预检请求逻辑

```javascript
// writeHead/setHeader有何区别
if (method === "options" && url === "/api/users") {
  res.writeHead(200，{
    "Access-Control-Allow-Origin":"https://localhost:3000",//允许源
    "Access-Control-Allow-Header":"X-Token Content-Type",//允许头报文
    "Access-Control-Allow-Method":"PUT"//允许方法
  });
  res.end();
}
```
