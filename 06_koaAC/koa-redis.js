const koa = require("koa");
const app = new koa();
const session = require("koa-session");
const redisStore = require("koa-redis");
const redis = require("redis");
const redisClient = redis.createClient(6379, "localhost");

//把redisClient回调风格封装成promise风格
const wrapper = require("co-redis");
const client = wrapper(redisClient);

app.keys = ["some secret"];

const SESS_CONFIG = {
  key: "kkb:sess",
  maxAge: 60 * 60 * 24 * 1000,
  httpOnly: true,
  signed: true,
  store: redisStore({ client }), //设置session时会写入redis里
};

app.use(session(SESS_CONFIG, app));

app.use(async (ctx, next) => {
  const keys = await client.keys("*");
  keys.forEach(async key => {
    console.log(await client.get(key));
  });
  await next();
});
app.use(ctx => {
  if (ctx.path === "/favicon.ico") return;
  let n = ctx.session.count || 1;
  ctx.session.count = n + 1;
  ctx.body = `第${n}次访问！`;
});
app.listen(3000, () => {
  console.log("listen 3000");
});
