# TCP 协议 即时聊天

使用 net 通讯

```javascript
const net = require("net");
const chatServer = net.createServer();

const clientList = [];

chatServer.on("connection", (client) => {
  client.write("Hi ");
  clientList.push(client);
  //接收到消息
  client.on("data", (data) => {
    console.log("receive:", data.toString());
    clientList.forEach((client) => {
      client.write(data);
    });
  });
  //广播
});

chatServer.listen(9000);
// telnet localhost 9000 连接客户端
```

# [HTTP 协议](https://www.processon.com/view/link/5ec52841e0b34d5f261e14e0#map)

观察 HTTP 协议 curl -v http://www.baidu.com=

TODO 待补充

## Request

### 请求行

1. Method
2. Url
3. HttpVersion

### 请求报头

1. User-Agent 用户代理
2. Content-Type 编码方式
3. Host 端口号
4. Accept 指定客户端接受何种类型信息

### 请求正问

根据 Content-Type 确定

1. appliction/x-www-form-urlencoded:默认编码方式，(title=test&sub=123)
2. application/json
3. text/html
4. text/plain
5. multipart/form-data

## response

### 状态行

状态码：

1. 1xxx:指示信息，表示已接收，继续处理
2. 2xxx:成功，200 成功/206 带 Range 头的 get 请求成功
3. 3xx：重定向
4. 4xx:客户端错误 404 未找到资源/403 拒绝/401 未授权/400 语法错误
5. 5xx：服务器端错误，500/503 当前不能处理客户端请求，一段时间可能恢复

## 消息包头

### 相应报头

1. Location
2. WWW-Authenticate
3. Server

### 实体报头

1. Content-Encoding
2. Content-Language
3. Content-Length
4. Content-Type
5. Expires

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
