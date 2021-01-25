// 定时格式是符合linux的crobtab;
// * * * * * *
// ┬ ┬ ┬ ┬ ┬ ┬
// │ │ │ │ │ |
// │ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
// │ │ │ │ └───── month (1 - 12)
// │ │ │ └────────── day of month (1 - 31)
// │ │ └─────────────── hour (0 - 23)
// │ └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, optional)
module.exports = {
  interval: "*/3 * * * * *",

  // interval: "3 * * * * *",
  handler() {
    console.log("定时任务 三秒执行一次" + new Date());
  },
};
