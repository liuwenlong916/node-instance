// module.exports = {
//   "get /": async ctx => {
//     ctx.body = "首页";
//   },
//   "get /detail": async ctx => {
//     ctx.body = "详情页";
//   },
// };

//对象=》对象工程 升阶，接收参数
module.exports = app => ({
  //controller.index.index
  //文件夹/文件名/属性名
  "get /": app.$ctrl.index.index,
  "get /detail": app.$ctrl.index.detail,
});
