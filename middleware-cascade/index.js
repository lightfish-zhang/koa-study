const Koa = require('koa');
const app = new Koa();

// x-response-time

app.use(async function (ctx, next) {
  console.log(`x-response-time when request`)
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
  console.log(`x-response-time when response`)
});

// logger

app.use(async function (ctx, next) {
  console.log(`logger when request`)
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
  console.log(`logger when response`)
});

// response

app.use(ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);