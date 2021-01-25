module.exports = app => ({
  index: async ctx => {
    //1
    // ctx.body = "首页CTRL";

    //2
    // const name = await app.$services.user.getName();
    // //此时传入的ctx是kkb实例等于app,
    // //kkb-loader.js initRouter line36传入
    // //也可以写为ctx.ctx.body = '首页CTRL'
    // app.ctx.body = "首页CTRL,用户:" + name;

    //3
    const user = await app.$model.user.findAll();
    app.ctx.body = user;
  },
  detail: async ctx => {
    app.ctx.body = "详情CTRL";
  },
});
