const redis = require("redis");
const client = redis.createClient(6379, "localhost");
client.set("hello", "redis");
client.get("hello", (err, val) => {
  console.log(val);
});
