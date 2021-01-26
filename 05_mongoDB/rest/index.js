const koa = require("koa");
const app = new koa();

//CRUD
const config = require("./conf");
const { loadModel } = require("./framework/loader");
const user = require("./model/user");
//链接mongo，并创建model
loadModel(config)(app);

// 接口注册路由
// get /api/user 查询
// post /api/user 插入
// put /api/user 更新
const bodyParser = require("koa-bodyparser");
app.use(bodyParser());
app.use(require("koa-static")(__dirname + "/"));
const restful = require("./framework/router");
app.use(restful);

app.listen(3000, () => {
  console.log("listion 3000");
});
