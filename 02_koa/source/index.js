// const http = require("http");

// const server = http.createServer((req, res) => {
//   res.writeHead(200);
//   res.end(`{name:'tom'}`);
// });

// server.listen(3000, () => {
//   console.log("监听端口3000");
// });

const KKB = require("./kkb/kkb");
const Router = require("./kkb/router");
const interceptor = require("./kkb/interceptor");

const app = new KKB();

app.use(interceptor);

//1.原生http写法
// app.use((req, res) => {
//   res.writeHead(200);
//   res.end(`hi KKB`);
// });

//2.继续简化
// app.use((ctx, next) => {
//   ctx.body = "hi KKB koa";
// });

// 3.中间件洋葱圈
//123456打印
app.use(async (ctx, next) => {
  ctx.body = "1";
  await next();
  ctx.body += "6";
});
app.use(async (ctx, next) => {
  ctx.body += "2";
  await next();
  ctx.body += "5";
});
app.use(async (ctx, next) => {
  ctx.body += "3";
  await next();
  ctx.body += "4";
});

//4.router
const router = new Router();
router.get("/index", async (ctx, next) => {
  ctx.body = "index page";
});
router.get("/post", async ctx => {
  ctx.body = "post page";
});
router.get("/list", async ctx => {
  ctx.body = "list page";
});

router.post("./index", async ctx => {
  ctx.body = "post index page";
});

app.use(router.router());

app.listen(3000, () => {
  console.log("KKB启动,监听端口3000");
});
