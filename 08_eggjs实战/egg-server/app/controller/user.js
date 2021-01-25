const { Controller } = require("egg");
/**
 * @Controller 用户管理
 */
class userController extends Controller {
  constructor(ctx) {
    super(ctx); //继承Controller基类方法
  }
  //增删改查

  /**
   * @summary 创建用户
   * @description 创建用户，记录用户账号密码
   * @router post /api/user
   * @request body createUserRequest * body
   * @response 200 baseResponse 创建成功
   */
  async create() {
    const { ctx } = this;
    ctx.validate(ctx.rule.createUserRequest); //校验规则与doc格式一致
    // aa();//错误代码
    // ctx.body = "user ctrl";
    ctx.helper.success({ ctx, res: { abc: 123 } });
  }
}

module.exports = userController;
