module.exports = {
  db: {
    url: "mongodb://localhost:27017/test",
    // option: { useNewUrlParser: true },
    option: { useUnifiedTopology: true, useNewUrlParser: true },
  },
};
