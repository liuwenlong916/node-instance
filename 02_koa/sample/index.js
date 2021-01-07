const Koa = require("koa");

const app = new Koa();

app.use(async (ctx, next) => {
  const start = Date.now();
  next();
  const end = Date.now();
  console.log(`请求${ctx.url}耗时：${parseInt(end - start)}ms`);
});

app.use((ctx, next) => {
  const expire = Date.now() + 100;
  while (Date.now() < expire) {}
  ctx.body = {
    name: "Tom",
  };
});

app.listen(3000, () => {
  console.log("server start on 3000");
});
