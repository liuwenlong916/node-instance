const koa = require("koa");

const { initRouter, initController } = require("./kkb-loader");

class kkb {
  constructor(conf) {
    this.$app = new koa();
    this.$ctrl = initController();
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
