# fs 保存数据

1. 写入
2. 读取
3. 命令行测试:readline

```javascript
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
```

# mysql

TODO->Dock 之后补写
