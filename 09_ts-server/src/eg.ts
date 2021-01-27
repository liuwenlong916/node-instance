// console.log("hello ts");

class Log {
  @decorate //anatation
  print(msg) {
    console.log(msg);
  }
}

//方式1：
// const dec = sender => (target, property) => {
//   //类没有被实例化，所以获取不到方法，需要使用prototype
//   // const old = target[property];
//   const old = target.prototype[property];
//   target.prototype[property] = msg => {
//     //AOP切面
//     console.log(`执行了 ${property}`);
//     msg = `${sender} :{${msg}}`;
//     old(msg);
//   };
// };
// dec("service1")(Log, "print");

//方式2：注解方式装饰器

function decorate(target, property, descriptor) {
  const old = descriptor.value;
  console.log("target", target); //class对象
  console.log("property", property); //属性
  console.log("descriptor", descriptor);
  console.log(target[property], descriptor.value); //相等
  console.log();
  descriptor.value = msg => {
    msg = `{${msg}}`;
    old.apply(null, [msg]);
  };
  return descriptor;
}

const log = new Log();
log.print("Hello TS");
