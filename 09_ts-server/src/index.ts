import * as Koa from "koa";
import * as bodify from "koa-body";
import * as serve from "koa-static";
import * as timing from "koa-xtime";

import { load } from "./utils/route-decors";
import { resolve } from "path";

import { Sequelize } from "sequelize-typescript";
const database = new Sequelize({
  port: 3306,
  database: "kaikeba",
  username: "root",
  password: "example",
  dialect: "mysql",
  modelPaths: [`${__dirname}/model`], //自动扫描model文件夹下模板,自动完成注册
});
database.sync({ force: true });

const app = new Koa();
app.use(timing());
app.use(serve(__dirname + "/public"));

app.use(
  bodify({
    multipart: true,
    strict: false, // 使用非严格模式，解析 delete 请求的请求体
  }),
);

app.use((ctx: Koa.Context) => {
  ctx.body = "hello";
});

const router = load(resolve(__dirname, "./routes"));

app.use(router.routes());

app.listen(3000, () => {
  console.log("服务器启动成功:3000");
});
