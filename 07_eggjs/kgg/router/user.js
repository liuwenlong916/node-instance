module.exports = {
  // /user
  "get /": async ctx => {
    ctx.body = "用户首页";
  },
  // /user/info
  "get /info": async ctx => {
    ctx.body = "用户信息页";
  },
};
