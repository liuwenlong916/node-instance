const fs = require("fs");
//摸板
const handlebars = require("handlebars");
const chalk = require("chalk");

module.exports = async () => {
  //1.获取页面列表
  const list = fs
    .readdirSync("./src/views")
    .filter(item => item !== "Home.vue")
    .map(item => ({
      name: item.replace(".vue", "").toLowerCase(),
      file: item,
    }));

  //生成路由定义
  compile({ list }, "./src/App.vue", "./template/App.vue.hbs");
  //生成菜单
  compile({ list }, "./src/router.js", "./template/router.js.hbs");

  function compile(meta, filePath, templatePath) {
    if (fs.existsSync(templatePath)) {
      //获取模板内容
      const template = fs.readFileSync(templatePath).toString();
      //把meta写入模板返回
      const result = handlebars.compile(template)(meta);
      //写入文件
      fs.writeFileSync(filePath, result);
      console.log(chalk.green(`🚀${filePath}创建成功`));
    }
  }
};
