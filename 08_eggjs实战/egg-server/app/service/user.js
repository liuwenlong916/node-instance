const Service = require("egg").Service;
class UserService extends Service {
  /**
   * 创建用户
   * @param {*} payload
   */
  async create(payload) {
    const { ctx } = this;
    payload.password = await ctx.genHash(payload.password);
    //user文件名会改为大写
    return ctx.model.User.create(payload);
  }
}
module.exports = UserService;
