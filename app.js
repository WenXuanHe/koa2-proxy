const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const path = require('path');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');

const render = require('koa-swig');
const co = require('co');

const index = require('./routes/dist/index');

// error handler
onerror(app);

app.context.render = co.wrap(render({
    root: path.join(__dirname, '/views'),
    autoescape: true,
    cache: 'memory',
    ext: 'html',
    writeBody: true
}));
// middlewares
app.use(bodyparser);
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

// app.use(views(__dirname + '/views', {
//   extension: 'html'
// }));

// logger
app.use(async(ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

//自己处理error
// app.context.onerror = function(err) {
//     console.log("user deal err" + err);
//     this.res.end(err && err.message || '');
// }

// routes
app.use(index.routes(), index.allowedMethods());

//打印每次访问服务的pid
console.log('server PID:', process.pid);

module.exports = app;
