const fs = require("fs"); //读取
const path = require("path"); //路径

const Router = require("koa-router");
const { type } = require("os");

//路径，回调
function load(dir, cb) {
  const url = path.resolve(__dirname, dir); //绝对路径

  const files = fs.readdirSync(url); //读取路径内文件集合
  files.forEach(fileName => {
    //过滤js文件
    fileName = fileName.replace(".js", "");
    const file = require(url + "/" + fileName); //引入文件
    cb(fileName, file); //执行回调
  });
}

function initRouter(app) {
  const router = new Router();
  //导出的是对象
  load("router", function (fileName, routes) {
    //index-> / user-> /user
    const prefix = fileName === "index" ? "" : `/${fileName}`;
    //判断是否为对象工厂
    routes = typeof routes === "function" ? routes(app) : routes;
    Object.keys(routes).forEach(key => {
      const [method, path] = key.split(" ");
      console.log(`正在映射: ${method} ${prefix + path}`);

      //router.get('/user',async ctx=>{...})
      router[method](prefix + path, routes[key]);
    });
  });
  return router;
}

function initController() {
  const controllers = {};
  load("controller", (filename, controller) => {
    controllers[filename] = controller;
  });
  return controllers;
}

module.exports = { initRouter, initController };
