// const app = new (require("koa"))();
// const { initRouter } = require("./kkb-loader");

// app.use(initRouter().routes());
// app.listen(3000);

//kkb封装

const kkb = require("./kkb");
const app = new kkb();
app.start(3000);
