//github三方登录
const koa = require("koa");
const app = new koa();

const static = require("koa-static");
app.use(static(__dirname + "/"));

const router = require("koa-router")();
const axios = require("axios");
const querystring = require("querystring");

const config = {
  client_id: "1356e91d2f57936f4668",
  client_secret: "3ba8e553a688021806fed932593dc3eae5ff976b",
};

router.get("/github/login", async ctx => {
  var dataStr = new Date().valueOf();
  console.log(dataStr);
  //重定向到github服务器
  const path = `https://github.com/login/oauth/authorize?client_id=${config.client_id}`;
  ctx.redirect(path);
});

router.get("/auth/github/callback", async ctx => {
  console.log("github callback...");
  const code = ctx.query.code; //认证码

  const params = {
    client_id: config.client_id,
    client_secret: config.client_secret,
    code,
  };
  //获取token认证令牌
  let res = await axios.post(
    "https://github.com/login/oauth/access_token",
    params,
  );
  //解析字符串
  const access_token = querystring.parse(res.data).access_token;
  console.log("token", querystring.parse(res.data));
  //获取用户信息失败？status code 400
  //获取github用户信息
  res = await axios.get(
    "https://api.github.com/user?access_token=" + access_token,
  );
  console.log("userAccess:", res.data);
  ctx.body = `
    <h1>Hello ${res.data.login}</h1>
    <img src='${res.data.avatar_url}' alt=''/>
  `;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log("listen 3000");
});
