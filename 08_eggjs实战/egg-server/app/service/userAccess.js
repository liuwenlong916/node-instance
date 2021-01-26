const Service = require("egg").Service;

class UserAccessService extends Service {
  async login(payload) {
    const { ctx, service } = this;
    console.log(payload);
    // const user = await service.user.find(_id);
    const user = await service.user.findByMobile(payload.mobile);
    if (!user) {
      ctx.throw(404, "user not found");
    }
    //egg-bcript插件会自动挂载compare方法
    let verifyPsw = await ctx.compare(payload.password, user.password);
    if (!verifyPsw) {
      ctx.throw(404, "user password error");
    }
    //校验成功后，返回一个令牌
    return { token: await service.actionToken.apply(user._id) };
  }
  async logout(payload) {}

  async current() {
    const { ctx, service } = this;
    // ctx.state.user 可以提取到JWT编码的data
    const _id = ctx.state.user.data._id;
    const user = await service.find(_id);
    if (!user) {
      ctx.throw(404, "user is not found");
    }
    user.password = "how old are yo?";
    return user;
  }
}

module.exports = UserAccessService;
