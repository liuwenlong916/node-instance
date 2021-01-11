const http = require("http");
const fs = require("fs");

const app = http.createServer((req, res) => {
  const { method, url } = req;
  if (method === "GET" && url === "/") {
    fs.readFile("./index.html", (err, data) => {
      if (err) {
        res.end("读取文件失败");
      }
      res.setHeader("Content-type", "text/html");
      res.end(data);
    });
  } else if (method === "GET" && url === "/api/users") {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify({ name: "Tom", age: 12 }));
  }
});

app.listen(4000, () => {
  console.log("api listen at " + 4000);
});
