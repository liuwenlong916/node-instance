const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

function load(dir, cb) {
  const url = path.resolve(__dirname, dir);
  const files = fs.readdirSync(url);
  //遍历依次加载
  files.forEach(fileName => {
    fileName = fileName.replace(".js", "");
    const file = require(url + "/" + fileName);
    cb(fileName, file); //放入文件名、导出模块
  });
}

const loadModel = config => app => {
  mongoose.connect(config.db.url, config.db.option);
  const conn = mongoose.connection;
  conn.on("error", () => {
    console.error("数据库连接失败");
  });
  // conn.once("open", async () => {
  //   console.log("open");
  app.$model = {};
  load("../model", (fileName, { schema }) => {
    console.log("load model:", fileName, schema);
    app.$model[fileName] = mongoose.model(fileName, schema);
    // app.$model[fileName] = mongoose.model(fileName, mongoose.Schema(schema));
  });
  // });
};

module.exports = { loadModel };
