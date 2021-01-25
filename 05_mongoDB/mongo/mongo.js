(async () => {
  const { MongoClient } = require("mongodb");
  const client = new MongoClient("mongodb://localhost:27017", {
    useNewUrlParser: true,
  });
  let ret = await client.connect();
  // console.log("connect", ret);

  const db = client.db("egg_x");
  const fruits = db.collection("fruits");
  ret = fruits.insertOne({
    name: "芒果",
    price: 20.1,
  });
  console.log("insert", ret);
})();
