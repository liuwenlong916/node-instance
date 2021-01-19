const http = require("http");

const session = {};
http
  .createServer((req, res) => {
    const sessionKey = "sid";
    const cookie = req.headers.cookie;
    if (cookie && cookie.indexOf(sessionKey) > -1) {
      const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`);

      // const sid = pattern.exec(cookie)[1];
      pattern.exec(cookie);
      const sid = RegExp.$1;

      console.log("welcome back", sid, session[sid]);
      res.end("welcome back");
    } else {
      const sid = (Math.random() * 9999999).toFixed();
      session[sid] = { name: "Tom" };
      res.setHeader("Set-Cookie", `${sessionKey}=${sid}`);
      console.log("welcome first");
      res.end("welcome first");
    }
  })
  .listen(3000);
