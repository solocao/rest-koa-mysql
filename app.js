const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('@koa/cors');

const index = require('./routes/index');
const users = require('./routes/users');

// 处理错误
onerror(app);

// middlewares 中间件
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}));

app.use(json());
app.use(logger());
app.use(cors());  // 跨域
app.use(require('koa-static')(__dirname + '/public'));


app.use(views(__dirname + '/views', {
  extension: 'html',// 后缀
  map: { html: 'ejs' }
}));

// logger 日志
app.use(async (ctx, next) => {
  console.log(ctx)
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});


// routes 路由
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// error-handling 错误处理
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

app.listen(3001)