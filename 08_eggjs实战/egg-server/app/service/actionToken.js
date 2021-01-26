const { Service } = require("egg");
class ActionTokenService extends Service {
  //根据id发放令牌
  async apply(_id) {
    const { ctx } = this;
    return ctx.app.jwt.sign({
      data: {
        _id,
      },
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, //一周内有效
    });
  }
}

module.exports = ActionTokenService;
