//手动设置入口
// /app.js
/**
 * 全局定义
 * @param app
 */
class AppBootHook {
  constructor(app) {
    this.app = app;
    app.root_path = __dirname;
  }
  //各种生命周期
  configWillLoad() {
    // Ready to call configDidLoad,
    // Config, plugin files are referred,
    // this is the last chance to modify the config.
  }
  configDidLoad() {
    // Config, plugin files have been loaded.
  }
  async didLoad() {
    // All files have loaded, start plugin here.
  }
  async willReady() {
    // All plugins have started, can do some thing before app ready
  }
  //准备就绪后初始化数据
  //多次测试时，不再需要重复设置数据
  //测试阶段需要
  async didReady() {
    // Worker is ready, can do some things
    // don't need to block the app boot.
    console.log("========Init Data=========");
    const ctx = await this.app.createAnonymousContext();

    await ctx.model.User.remove(); //model层和数据库交互

    // await ctx.model.User.create({...})//直接添加密码不加密
    await ctx.service.user.create({
      //service层处理逻辑
      mobile: "13611388415",
      password: "111111",
      realName: "老夏",
    });
  }
  async serverDidReady() {}
  async beforeClose() {
    // Do some thing before app close.
  }
}
module.exports = AppBootHook;
