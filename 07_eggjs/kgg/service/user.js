function delay(data, tick = 1000) {
  return new Promise(resolve => {
    setTimeout(function () {
      resolve(data);
    }, tick);
  });
}

module.exports = app => ({
  getName() {
    //1
    // return delay("Tom");
    //2
    const user = app.$model.user.findAll();
    return user;
  },
  getAge() {
    return 20;
  },
});
