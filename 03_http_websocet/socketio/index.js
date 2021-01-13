var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var fs = require("fs");

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
  // var content = fs.readFileSync(__dirname + "index.html");
  // res.end(content);
});

io.on("connection", function (socket) {
  console.log("a user connected");
  socket.on("chat message", function (msg) {
    console.log("chat message:" + msg);
    io.emit("chat message", msg);
  });

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});

http.listen("3000", function () {
  console.log("listen on *:3000");
});
