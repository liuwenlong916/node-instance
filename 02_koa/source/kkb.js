const http = require("http");

module.exports = class KKB {
  listen(...args) {
    const server = http.createServer((req, res) => {
      this.callback(req, res);
    });
    server.listen(...args);
  }
  use(callback) {
    this.callback = callback;
  }
};
