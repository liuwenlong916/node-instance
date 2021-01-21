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
