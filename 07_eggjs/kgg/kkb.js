const koa = require("koa");

const {
  initRouter,
  initController,
  initService,
  loadConfig,
  initSchedule,
} = require("./kkb-loader");

class kkb {
  constructor(conf) {
    this.$app = new koa();
    initSchedule();
    loadConfig(this);
    this.$services = initService(this);
    this.$ctrl = initController(this);
    //接受参数,以便获取Controller集合
    this.$router = initRouter(this);
    this.$app.use(this.$router.routes());
  }

  start(part) {
    this.$app.listen(part, () => {
      console.log("服务器启动成功，端口" + part);
    });
  }
}

module.exports = kkb;
