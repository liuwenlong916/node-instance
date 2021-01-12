// const koa = require("koa");
// const static = require("koa-static");
// const app = new koa();
// app.use(static(__dirname + "/"));

const express = require("express");
const proxy = require("http-proxy-middleware");

const app = express();
app.use(express.static(__dirname + "/"));

//当请求/api开头时，代理到localhost:4000地址
app.use(
  "/api",
  proxy({
    target: "http://localhost:4000",
    changeOrigin: false,
  }),
);
app.listen(3000, () => {
  console.log("start 3000");
});
