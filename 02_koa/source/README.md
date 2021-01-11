# 手写 koa 核心就是中间件，把原生 http 封装

1. 定义三个类：context/respones/request
2. context.req/request.req 指向原生 req
3. context.res/respones.res 指向原生 res

4. app.use 传入回调函数，listen 时依次执行
5. 加工 ctx, 把 res/req 加入到 ctx
6. req.end()=> ctx.body

## [洋葱圈模型，设计模式，责任链模型](https://github.com/su37josephxia/wheel-awesome.git)

```javascript
//返回一个方法，接受ctx
  compose(middlewares) {
    //传入上下文
    return function (ctx) {
      return dispatch(0);
      function dispatch(i) {
        let fn = middlewares[i];
        if (!fn) {
          return Promise.resolve(); //返回一个空承诺
        }
        return Promise.resolve(
          //将上下文传入中间件 midd(ctx,next)
          fn(ctx, function next() {
            //下一级Promise
            return dispatch(i + 1);
          }),
        );
      }
    };
  }
```

# 路由

1. 原生 http 使用 if/esle 区分 url
2. 策略模式的应用
3. 路由实质就是个生成中间件。

# 静态资源

# ip 拦截器
