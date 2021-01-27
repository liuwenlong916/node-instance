import * as Koa from "koa";
import { prependOnceListener } from "process";

import { get, post } from "../utils/route-decors";

const users = [
  { name: "tom", age: 20 },
  { name: "tom", age: 20 },
];

export default class User {
  @get("/users")
  public list(ctx: Koa.Context) {
    ctx.body = {
      ok: 1,
      users,
    };
  }
  @post("/users")
  public add(ctx: Koa.Context) {
    users.push(ctx.request.body);
    ctx.body = { ok: 1 };
  }
}
