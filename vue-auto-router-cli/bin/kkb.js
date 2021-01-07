#!/usr/bin/env node
// console.log("cli.....");
const program = require("commander");

program.version(require("../package.json").version);

//定制命令行
program
  .command("init <name>") //定义命令
  .description("init project") //描述
  // .action(name => {
  //   // console.log("init " + name);
  // }); //命令执行内容，内部是一个方法
  .action(require("../lib/init")); //返回一个方法

program
  .command("refresh")
  .description("refresh router...")
  .action(require("../lib/refresh"));

//默认写法
program.parse(process.argv);
