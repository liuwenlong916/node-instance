// const http = require("http");

// const server = http.createServer((req, res) => {
//   res.writeHead(200);
//   res.end(`{name:'tom'}`);
// });

// server.listen(3000, () => {
//   console.log("监听端口3000");
// });

const KKB = require("./kkb.js");
const app = new KKB();

//1.原生http写法
// app.use((req, res) => {
//   res.writeHead(200);
//   res.end(`hi KKB`);
// });

//2.继续简化
app.use((ctx, next) => {
  ctx.body = "hi KKB koa";
});
app.listen(3000, () => {
  console.log("KKB启动,监听端口3000");
});
