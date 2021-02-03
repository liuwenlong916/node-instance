# eggjs 四层结构

egg-init egg --type=simple 或者
npm init egg --type=simple

## router.js

```javascript
module.exports = app => {
  const { router, controller } = app;
  router.get("/", controller.home.index);
  router.get("/about", controller.home.about);
  router.get("/user", controller.user.index);
};
```

## controller

1. 路由访问

```javascript
const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = "hi, egg";
  }
  async about() {
    const { ctx } = this;
    ctx.body = "about";
  }
}

module.exports = HomeController;
```

## service

1. 查询数据库

```javascript
const UserController = require("../controller/user");

class UserService extends Service {
  async getAll() {
    // return [
    //   {
    //     name: "Tom",
    //   },
    // ];
    return await this.ctx.module.User.findAll();
  }
}
module.exports = UserService;
```

## model

1. 数据库表定义

```javascript
module.exports = app => {
  const { STRING } = app.Sequelize;
  const User = app.module.define(
    "user",
    { name: STRING(30) },
    { timestamps: true },
  );
  User.sync({ force: true }); //数据库同步
  return User;
};
```

# simple-eggjs
