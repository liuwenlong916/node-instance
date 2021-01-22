const { Service } = require("egg");
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
