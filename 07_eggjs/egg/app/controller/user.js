const { Controller } = require("egg");

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.body = {
    //   name: "tom",
    // };
    ctx.body = await ctx.model.User.findAll();
  }
}

module.exports = UserController;
