const net = require("net");
const chatServer = net.createServer();

const clientList = [];

chatServer.on("connection", client => {
  client.write("Hi ");
  clientList.push(client);
  //接收到消息
  client.on("data", data => {
    console.log("receive:", data.toString());
    clientList.forEach(client => {
      client.write(data);
    });
  });
  //广播
});

chatServer.listen(9000);
// telnet localhost 9000 连接客户端
