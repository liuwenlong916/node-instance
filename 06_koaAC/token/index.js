const { stat } = require("fs");
const koa = require("koa");
const app = new koa();

const static = require("koa-static");
app.use(static(__dirname + "/")); //设置静态置源访问呢路径，正常是/static

const bodyParser = require("koa-bodyparser");
app.use(bodyParser());

const jwt = require("jsonwebtoken"); //发放token
const jwtAuth = require("koa-jwt"); //中间件验证token有效性

const secret = "it's a secret";
app.keys = ["some secret"];

const router = require("koa-router")();
router.post("/users/login-token", async ctx => {
  const { body } = ctx.request;
  //登录数据库逻辑省略
  const userinfo = body.username;
  ctx.body = {
    message: "登录成功",
    user: userinfo,
    token: jwt.sign(
      {
        data: userinfo,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      secret,
    ),
  };
});

//jwtAuth验证token,解析成功后会放到ctx.state.user里
router.get("/users/getUser-token", jwtAuth({ secret }), async ctx => {
  ctx.body = {
    message: "获取成功",
    userinfo: ctx.state.user.data,
  };
});

app.use(router.routes());

app.listen(3000, () => {
  console.log("listen 3000");
});
