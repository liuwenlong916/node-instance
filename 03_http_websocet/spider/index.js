const originRequest = require("request"); //后端发起request请求

const iconv = require("iconv-lite"); //转utf-8
const cheerio = require("cheerio"); //后端的jQuery

function request(url, callback) {
  const options = {
    // url: url,
    encoding: null,
  };
  originRequest(url, options, callback);
}

for (let i = 100553; i < 100563; i++) {
  const url = `https://www.dy2018.com/i/${i}.html`;
  require(url, function (err, res, body) {
    const html = iconv.decode(body, "gb2312");
    const $ = cheerio.load(html);
    console.log($(".title_all h1").text());
  });
}
