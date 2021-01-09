module.exports = {
  get body() {
    // return this.res.body;
    //原生response没有body字段，只有body流
    //所以定义一个内部变量
    return this._body;
  },
  set body(val) {
    // this.req.body = val;
    this._body = val;
  },
};
