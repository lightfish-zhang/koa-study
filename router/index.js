const Koa = require('koa');
const app = new Koa();
const koaRouter = require('koa-router');
const router = new koaRouter();

router.get('/example', async (ctx, next) => {
    ctx.body = 'Hello World';
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3001);