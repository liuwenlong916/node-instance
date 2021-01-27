import * as Koa from "koa";
import * as glob from "glob";
import * as KoaRouter from "koa-router";

type HTTPMethod = "get" | "put" | "del" | "post" | "patch";

const router = new KoaRouter();

// export const get = path => {
//   return (target, property, descriptor) => {
//     router["get"](path, target[property]);
//   };
// };

// export const post = path => {
//   return (target, property, descriptor) => {
//     router["post"](path, target[property]);
//   };
// };

// const method = method => path => {
//   return (target, property, descriptor) => {
//     router[method](path, target(property));
//   };
// };
// export const get = method("get");
// export const post = method("post");

//再次封装,函数内部不包含上下文

const method = (router: KoaRouter) => (method: HTTPMethod) => path => {
  return (target, property, descriptor) => {
    router[method](path, target[property]);
  };
};
//把router作为参数传入，不直接上下文的router
const decorate = method(router);
export const get = decorate("get");
export const post = decorate("post");

export const load = (folder: string): KoaRouter => {
  const extname = ".{js|ts}";
  //遍历folder目录下所有的.js/.ts文件
  glob
    .sync(require("path").join(folder, `./**/*${extname}`))
    .forEach(filePath => {
      //require会直接运行该文件代码,包含get/post装饰器,同时会执行,
      //路由规则会加到router里
      //router[method](path, target[property]);
      require(filePath);
      //直接返回router就行
    });
  return router;
};
