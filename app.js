const Koa = require('koa');
const path = require('path');
const staticServer = require('koa-static');
const app = new Koa();


// log request URL:
app.use(async(ctx, next) => {
    console.log(`浏览器请求: ${ctx.request.method} ${ctx.request.url}`);
    await next();
});

app.use(staticServer(path.join('/node/vue-kugou/dist')));

// 处理POST请求，解析request body
// app.use(bodyParser());

// app.use(controller);
//即app.use(router.routes());

app.listen(4000);
console.log('app started at port 4000...');