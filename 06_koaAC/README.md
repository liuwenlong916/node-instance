# cookie-session

1. http 是无状态协议，后端给前端写一个状态，cookie 应运而生
2. cookie 存储大小有限制
3. cookie 是明文，session 应运而生
4. session 会话机制是一种服务器端机制
5. 服务端记录，返回一个标识符保存到 cookie
6. 缺点:session 保存在内存中，服务器重启会丢失，多用户内存消耗变大，多台后端服务器没办法互通 session,redis 应运而生

# koa-session

```javascript
const koa = require("koa");
const app = new koa();
const session = require("koa-session");

//签名key,keys作用对cookie签名加密
app.keys = ["some secret"];

const SESS_CONFIG = {
  key: "kkb:sess", //cookie键名
  maxAge: 86400000, //有效期 60*60*24*1000
  httpOnly: true, //仅服务器修改
  signed: true, //签名cookie,cookie会添加一个kkb:sess.sig,防止篡改cooike
};

app.use(session(SESS_CONFIG, app));

app.use(ctx => {
  if (ctx.path === "/favicon.ico") return;
  let n = ctx.session.count || 1;
  ctx.session.count = n + 1;
  ctx.body = `第${n}次访问！`;
});

app.listen(3000);
```

# 哈希 Hash - SHA MD5

摘要

- 把一个不定长摘要定长结果
- 摘要 yanglaoshi -> x
- 雪崩效应

# redis

# token

1. session 需要服务器有状态
2. app/跨域不灵活

# jwt

1. 三部分组成：令牌头,payload,哈希
2. 第三部分是由前两部分+secret 加密而来的。
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. {"alg":"HS256","typ":"JWT"}
   eyJkYXRhIjoidGVzdCIsImV4cCI6MTYxMTE5ODY0NiwiaWF0IjoxNjExMTk1MDQ2fQ.{"data":"test","exp":1611198646,"iat":1611195046}
   5cDp4Ppf0CuhGqV1DUPdi-g0v31LdyEzuirkXMq6UqI
