module.exports = async function (ctx, next) {
  const blackList = ["127.0.0.1"];
  const { res, req } = ctx;
  const ip = getClientIP(req);

  if (blackList.indexOf(ip) > -1) {
    ctx.body = "not allowed";
  } else {
    next();
  }

  function getClientIP(req) {
    return (
      req.headers["x-forwarded-for"] || // 判断是否有反向代理 IP
      req.connection.remoteAddress || // 判断 connection 的远程 IP
      req.socket.remoteAddress || // 判断后端的 socket 的 IP
      req.connection.socket.remoteAddress
    );
  }
};
