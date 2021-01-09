const http = require("http");
const respones = require("./Modul/response");
const request = require("./Modul/request");
const context = require("./Modul/context");

module.exports = class KKB {
  constructor() {
    this.middlewares = [];
  }
  listen(...args) {
    const server = http.createServer(async (req, res) => {
      // this.callback(req, res);

      const ctx = this.createContext(req, res);
      // this.callback(ctx);

      const fn = this.myCompose(this.middlewares);
      await fn(ctx);

      res.end(ctx.body);
    });
    server.listen(...args);
  }
  // use(callback) {
  //   this.callback. =callback;
  // }

  use(middleware) {
    this.middlewares.push(middleware);
  }
  //构建上下文ctx
  createContext(req, res) {
    const ctx = Object.create(context);
    ctx.request = Object.create(request);
    ctx.respones = Object.create(respones);

    ctx.req = ctx.request.req = req;
    ctx.res = ctx.respones.res = res;

    return ctx;
  }

  //返回一个方法，接受ctx
  compose(middlewares) {
    //传入上下文
    return function (ctx) {
      return dispatch(0);
      function dispatch(i) {
        let fn = middlewares[i];
        if (!fn) {
          return Promise.resolve(); //返回一个空承诺
        }
        return Promise.resolve(
          //将上下文传入中间件 midd(ctx,next)
          fn(ctx, function next() {
            //下一级Promise
            return dispatch(i + 1);
          }),
        );
      }
    };
  }
  myCompose(middlewares) {
    return function (ctx) {
      return dispatch(0);
      function dispatch(i) {
        const fn = middlewares[i];
        if (!fn) return Promise.resolve();
        return Promise.resolve(
          fn(ctx, function next() {
            return dispatch(i + 1);
          }),
        );
      }
    };
  }
};
