const koa = require("koa");
const static = require("koa-static");
const app = new koa();
app.use(static(__dirname + "/"));

//express引入失败？
// const express = require("express");
// const app = express();
// app.use(express.static(__dirname, "/"));
app.listen(3000, () => {
  console.log("start 3000");
});
