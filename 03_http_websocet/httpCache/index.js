function updateTime() {
  //保证setInterval是单例
  this.timmer =
    this.timmer ||
    setInterval(() => {
      this.time = new Date().toUTCString();
    }, 1000);
  return this.time;
}

const http = require("http");
http
  .createServer((req, res) => {
    const { url } = req;
    if (url === "/") {
      res.end(`
      <html>
        Html Update Time ${updateTime()}
        <script src='main.js'></script>
      </html>
      `);
    } else if (url === "/main.js") {
      const content = `document.writeln('<br>JS Update Time ${updateTime()}')`;
      //1.强缓存
      // http1.0
      // res.setHeader("Expires", new Date(Date.now() + 10 * 1000).toUTCString());
      // http1.1
      // res.setHeader("cache-control", "max-age=15");

      //2.协商缓存
      res.setHeader("cache-control", "no-cache");
      //last-modified
      // //再次请求时会，有if-modified-since
      // res.setHeader("last-modified", new Date().toUTCString());
      // if (
      //   new Date(req.headers["if-modified-since"]).getTime() + 8 * 1000 >
      //   Date.now()
      // ) {
      //   console.log("last-modified协商缓存命中");
      //   res.statusCode = 304;
      //   res.end();
      //   return;
      // }
      //etag
      const crypto = require("crypto"); //加密包
      const hash = crypto.createHash("sha1").update(content).digest("hex"); //hex把二进制转为十六进制
      res.setHeader("Etag", hash);
      if (req.headers["if-none-match"] === hash) {
        console.log("Etag协商缓存命中");
        res.statusCode = 304;
        res.end();
        return;
      }
      res.statusCode = 200;
      res.end(content);
    } else if (url === "/favicon.ico") {
      res.end();
    }
  })
  .listen(3000, () => {
    console.log(`Http Cache Test Run at 3000`);
  });
