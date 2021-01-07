const { promisify } = require("util");
const figlet = promisify(require("figlet")); //把内容画出来
const chalk = require("chalk"); //设置颜色
const clear = require("clear"); //清屏
const log = content => console.log(chalk.green(content));
const { clone } = require("./download");
const open = require("open");

//子进程安装依赖，
//TODO子进程log日志没有对接到主进程？
const spawn = async (...args) => {
  // log流对接 子->主
  //封装promis风格。
  const { spawn } = require("child_process");
  return new Promise(resolve => {
    const proc = spawn(...args);
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    proc.on("close", () => {
      resolve();
    });
  });
};
module.exports = async name => {
  // clear();
  // const data = await figlet("KKB Welcome " + name);
  // log(data);

  //1.下载项目
  // log(`🚀创建项目:${name}`);
  // await clone("github:liuwenlong916/vue-template", name);

  //2.安装依赖 npm install
  //了解子进程
  //   log("安装依赖");
  //   await spawn("npm", ["install"], { cwd: `./${name}` });
  //   log(`
  // 👌安装完成：
  // To get Start:
  // ===========================
  // cd ${name}
  // npm run serve
  // ===========================`);

  //3.启动项目
  open("http://localhost:8080");
  //指定运行文件夹
  await spawn("npm", ["run", "serve"], { cwd: `./${name}` });
};
