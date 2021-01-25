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
      // router[method](prefix + path, routes[key]);
      router[method](prefix + path, async ctx => {
        app.ctx = ctx;
        await routes[key](app);
      });
    });
  });
  return router;
}

function initController(app) {
  const controllers = {};
  load("controller", (filename, controller) => {
    controller = typeof controller == "function" ? controller(app) : controller;
    controllers[filename] = controller;
  });
  return controllers;
}

function initService(app) {
  const services = {};
  load("service", (fileName, service) => {
    service = typeof service == "function" ? service(app) : service;
    services[fileName] = service;
  });
  return services;
}

const Sequelize = require("sequelize");
function loadConfig(app) {
  load("config", (fileName, conf) => {
    if (conf.db) {
      app.$db = new Sequelize(conf.db);
      app.$model = {};
      load("model", (fileName, { schema, options }) => {
        app.$model[fileName] = app.$db.define(fileName, schema, options);
      });

      app.$db.sync();
    }
    if (conf.middleware) {
      conf.middleware.forEach(mid => {
        const midPath = path.resolve(__dirname, "middleware", mid);
        app.$app.use(require(midPath));
      });
    }
  });
}

const schedule = require("node-schedule");
function initSchedule() {
  load("schedule", (fileName, { interval, handler }) => {
    schedule.scheduleJob(interval, handler);
  });
}

module.exports = {
  initRouter,
  initController,
  initService,
  loadConfig,
  initSchedule,
};
