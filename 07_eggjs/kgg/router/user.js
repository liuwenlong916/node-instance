module.exports = {
  // /user
  // "get /": async ctx => {
  //   ctx.body = "用户首页";
  // },
  // // /user/info
  // "get /info": async ctx => {
  //   ctx.body = "用户信息页";
  // },

  "get /": async app => {
    // const name = await app.$services.user.getName();
    // app.ctx.body = "用户:" + name;
    const user = await app.$services.user.getName();
    app.ctx.body = user;
  },
  //?
  "get ": async app => {
    // const name = await app.$services.user.getName();
    // app.ctx.body = "用户:" + name;
    const user = await app.$services.user.getName();
    app.ctx.body = user;
  },

  "get /info": async app => {
    const age = app.$services.user.getAge();
    app.ctx.body = "年龄:" + age;
  },
};
