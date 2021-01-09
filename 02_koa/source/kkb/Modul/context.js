module.exports = {
  get url() {
    return this.request.url;
  },
  get method() {
    return this.request.method;
  },
  get body() {
    return this.request.body;
  },
  set body(val) {
    this.request.body = val;
  },
};
