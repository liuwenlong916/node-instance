const { prototype } = require("module");
const { promisify } = require("util");
//下载地址,目标放入目录
module.exports.clone = async function (repo, desc) {
  const download = promisify(require("download-git-repo"));
  const ora = require("ora");
  const process = ora(`下载...${repo}`); //加载转圈
  process.start();
  await download(repo, desc);
  process.succeed();
};
