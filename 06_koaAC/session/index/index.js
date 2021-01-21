// koa2 - cors;
const koa = require("koa");
const app = new koa();

const bodyParser = require("koa-bodyparser");
const static = require("koa-static");
app.use(static(__dirname + "/")); //读取静态文件，localhost:3000/test.html直接访问
app.use(bodyParser()); //把流转为json

const session = require("koa-session");
const redis = require("redis");
const redisClient = redis.createClient(6379, "localhost");
const redisStore = require("koa-redis");

const wrapper = require("co-redis");
const { clearLine } = require("readline");

const client = wrapper(redisClient);

app.keys = ["some secret"];
const SESS_CONFIG = {
  key: "redis:session",
  maxAge: 60 * 60 * 24 * 1000,
  signed: true,
  httpOnly: true,
  store: redisStore({ client }),
};
app.use(session(SESS_CONFIG, app));

app.use(async (ctx, next) => {
  const keys = await client.keys("*");
  keys.forEach(async key => {
    console.log(await client.get(key));
  });
  await next();
});

app.use((ctx, next) => {
  if (ctx.url.indexOf("login") > -1) {
    next();
  } else {
    if (!ctx.session.userinfo) {
      console.log("没有登录");
      ctx.body = {
        message: "没有登录",
      };
    } else {
      next();
    }
  }
});

const router = require("koa-router")();

router.post("/users/login", async ctx => {
  const { body } = ctx.request;
  ctx.session.userinfo = body.username;
  ctx.body = {
    message: "登录成功",
  };
});
router.post("/users/logout", async ctx => {
  delete ctx.session.userinfo;
  ctx.body = {
    message: "登出成功",
  };
});
router.get("/users/getUser", async ctx => {
  //中间件鉴权，内部不需要再鉴权
  ctx.body = {
    message: "获取数据成功",
    userinfo: ctx.session.userinfo,
  };
});

app.use(router.routes());
app.use(router.allowedMethods);

app.listen(3000, () => {
  console.log("listen 3000");
});
