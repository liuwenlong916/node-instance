//函数整合
// const add = (a, b) => a + b;
// const square = x => x * x;

// // const fn = (x, y) => square(add(x, y));

// // const compose = (fn1, fn2) => (...arg) => fn2(fn1(...arg));
// // const fn = compose(add, square);

// const compose = (...[first, ...other]) => (...arg) => {
//   let ret = first(...arg);
//   other.forEach(fn => {
//     ret = fn(ret);
//   });

//   return ret;
// };

// const fn = compose(add, square, square);

// console.log(fn(2, 3));

//洋葱圈模型，设计模式，责任链模型
//https://github.com/su37josephxia/wheel-awesome.git
async function fn1(next) {
  console.log("begin fn1");
  await next();
  console.log("end fn1");
}
async function fn2(next) {
  console.log("begin fn2");
  await next();
  console.log("end fn2");
}
async function fn3(next) {
  console.log("begin fn3");
  await delay();
  await next();
  console.log("end fn3");
}

function delay() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}

function compose(middlewares) {
  return function () {
    return dispatch(0);
    function dispatch(i) {
      let fn = middlewares[i];
      if (!fn) {
        return Promise.resolve(); //返回一个空承诺
      }
      return Promise.resolve(
        fn(function next() {
          //下一级Promise
          return dispatch(i + 1);
        }),
      );
    }
  };
}

const middlewares = [fn1, fn2, fn3];
const fn = compose(middlewares);
fn();
