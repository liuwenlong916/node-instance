const http = require("http");
const fs = require("fs");

const app = http.createServer((req, res) => {
  const { method, url } = req;
  console.log("url:", url, "; method:", method);
  if (method === "GET" && url === "/") {
    fs.readFile("./index.html", (err, data) => {
      if (err) {
        res.end("读取文件失败");
      }
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    });
  } else if (method === "GET" && url === "/api/users") {
    //只能解决简单请求
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Content-Type", "application/json");
    console.log("GET");
    res.end(JSON.stringify({ name: "Tom", age: 12 }));
  } else if (method === "OPTIONS" && url === "/api/users") {
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "http://localhost:3000", //允许源
      "Access-Control-Allow-Headers": "X-Token,Content-Type", //允许头报文
      // "Access-Control-Allow-Methods": "PUT", //允许方法
    });
    console.log("options");
    res.end();
  }
});

app.listen(4000, () => {
  console.log("api listen at " + 4000);
});
