module.exports = {
  db: {
    dialect: "mysql",
    host: "localhost",
    database: "kaikeba",
    username: "root",
    password: "123456",
  },
  //有顺序
  middleware: ["logger"],
};
