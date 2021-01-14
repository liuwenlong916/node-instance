const fs = require("fs");
const { stdout } = require("process");

function get(key) {
  fs.readFile("./db.json", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const json = data ? JSON.parse(data) : {};
    // return json[key];
    console.log(json[key]);
  });
}

function set(key, val) {
  fs.readFile("./db.json", (err, data) => {
    //第一次会报错，所以注释掉
    // if (err) {
    //   console.log(err);
    //   return;
    // }
    const json = data ? JSON.parse(data) : {};
    json[key] = val;
    fs.writeFile("./db.json", JSON.stringify(json), e => {
      if (e) {
        console.log(e);
        return;
      }
      console.log("写入成功");
    });
  });
}

//命令行接口
// set a 1
// get a
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: stdout,
});

//输入命令行，回车触发
rl.on("line", function (input) {
  const [op, key, val] = input.split(" ");
  if (op === "get") {
    get(key);
  } else if (op === "set") {
    set(key, val);
  } else if (op === "quit") {
    rl.close();
  } else {
    console.log("没有该操作");
  }
});

rl.on("close", function () {
  console.log("程序关闭");
  process.exit(0);
});
