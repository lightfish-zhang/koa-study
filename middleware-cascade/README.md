## 本例出发点

第一步接触koa，了解文档，它封装了http模块，结构其实松散，它是提供一套http框架的方法论，它的一个基本思想是中间件级联`middleware cascade`，形象来说是`回形针`或者`洋葱`，网上有许多介绍该形象的文章，本文则从实践执行代码来了解。

## 本例代码

本例代码只在`middleware-cascade/index.js`，使用`app.use()`api来注册两个中间件，通过打印来确定中间件执行的顺序。

## 测试运行

需要有两个终端调试

- 终端1运行命令

```
node middleware-cascade/index.js
```

- 终端2运行，笔者习惯使用curl调试接口

```
curl -i --request GET \
  --url http://localhost:3000
```

- 终端1打印出

```
x-response-time when request
logger when request
GET / - 3
logger when response
x-response-time when response
```

- 终端2打印出

```
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8
Content-Length: 11
X-Response-Time: 3ms
Date: Mon, 03 Jul 2017 03:19:06 GMT
Connection: keep-alive

Hello World
```

## 结论

- `request`处理是在`async function(ctx, next)`中的`await next()`前
- `response`处理是在`async function(ctx, next)`中的`await next()`后
- `ctx`是中间件传参的上下文的句柄
- `app.use()`，提供注册中间节的接口，类似堆栈，越先注册的中间件，越先处理请求`request`，越后处理响应`response`。