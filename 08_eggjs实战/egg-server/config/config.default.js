/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1611542775684_1001";

  // add your middleware config here
  //错误统一处理方式一:中间件
  config.middleware = ["errorHandler"];
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.swaggerdoc = {
    dirScanner: "./app/controller",
    apiInfo: {
      title: "开课吧接口",
      description: "开课吧接口 swagger-ui for egg",
      version: "1.0.0",
    },
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    enableSecurity: false,
    // enableValidate: true,
    routerMap: true, //自动加载路由，更新文件router.js
    enable: true,
  };

  config.mongoose = {
    url: "mongodb://localhost:27017/egg_x",
    options: {
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
    },
  };
  // //错误统一处理方法二
  // config.onerror = {
  //   all(err, ctx) {
  //     // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
  //     ctx.app.emit("error", err, this);
  //     const status = err.status || 500;
  //     // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
  //     const error =
  //       status === 500 && ctx.app.config.env === "prod"
  //         ? "Internal Server Error"
  //         : err.message;
  //     // 从 error 对象上读出各个属性，设置到响应中
  //     ctx.body = {
  //       code: status, // 服务端自身的处理逻辑错误(包含框架错误500 及 自定义业务逻辑错误533开始 ) 客户端请求参数导致的错误(4xx开始)，设置不同的状态码
  //       error: error,
  //     };
  //     if (status === 422) {
  //       ctx.body.detail = err.errors;
  //     }
  //     ctx.status = 200;
  //   },
  // };

  return {
    ...config,
    ...userConfig,
  };
};
