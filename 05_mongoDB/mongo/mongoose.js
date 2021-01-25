//mongoDB下，不再有限设计数据库，DB沦为持久化服务

//优势，为何使用mongoose
//定义规则Schema，mongo没有定义每个model的字段
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/egg_x", {
  useCreateIndex: true,
});
const conn = mongoose.connection;
conn.on("error", () => {
  console.log("连接数据库失败");
});
conn.once("open", async () => {
  //定义一个schema->类似table字段
  const schema = mongoose.Schema({
    category: String,
    name: String,
    // price: Number,
  });

  //编译一个model->对应数据库中复数、小写的collection
  const Fruit = mongoose.model("fruit", schema);

  try {
    //创建，create返回Promis->对应insert
    let r = await Fruit.create({
      category: "温带水果",
      name: "苹果",
      price: 5, //schema未定义字段不会被插入
    });
    console.log("插入数据", r);

    //查询->select,对象为条件
    r = await Fruit.find({ name: "苹果" });
    console.log("查询数据", r);
    //更新->update
    r = await Fruit.updateOne({ name: "苹果" }, { $set: { name: "芒果" } });
    console.log("更新数据", r);

    //删除
    // r = await Fruit.deleteOne({ name: "芒果" });
    // console.log("删除数据", r);
  } catch (e) {
    console.log(e);
  }
});
