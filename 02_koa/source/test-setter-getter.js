//面试题get set 如何实战：
//根本是解决把比较麻烦的写法封装更加优雅简化

//echarts 图形文件，配置比较麻烦，封装一下简化配置写法
/**
 * option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    }]
};
 */

const kaikeba = {
  info: {
    name: "开课吧",
  },

  get name() {
    return this.info.name;
  },
  set name(val) {
    console.log(`new name is ${val}`);
    //添加响应式逻辑
    this.info.name = val;
  },
};

//kaikeba.name 获取
console.log(kaikeba.name);
kaikeba.name = "kkb";
console.log(kaikeba.name);
