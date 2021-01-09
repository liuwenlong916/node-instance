const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");

class router {
  constructor() {
    this.stack = [];
  }

  get(path, middleware) {
    this.register(path, "get", middleware);
  }
  post(path, middleware) {
    this.register(path, "post", middleware);
  }
  register(path, method, middleware) {
    this.stack.push({ path, method, middleware });
  }
  //返回一个中间件方法。
  router() {
    let stack = this.stack;
    return async function (ctx, next) {
      let route;
      let currentPath = ctx.url;
      let method = ctx.method;
      //返回一个数组
      const item = stack.filter(item => {
        return item.path === currentPath && item.method.indexOf(method) > -1;
      });
      item.length > 0 && (route = item[0].middleware);

      // for (let i = 0; i < stack.length; i++) {
      //   let item = stack[i];
      //   if (item.path === currentPath && item.method.indexOf(method) > -1) {
      //     route = item.middleware;
      //   }
      // }
      if (typeof route === "function") {
        route(ctx, next);
      }
      await next();
    };
  }
}

module.exports = router;
