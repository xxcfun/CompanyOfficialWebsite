const path = require('path');
const Koa = require('koa');
const cors = require('@koa/cors');
const { koaBody } = require('koa-body');
const serve = require('koa-static');
const config = require('./config');
const db = require('./models');
const adminCtrl = require('./controllers/adminController');
const errorHandler = require('./middleware/errorHandler');
const requestLog = require('./middleware/requestLog');
const rateLimit = require('./middleware/rateLimit');
const publicRoutes = require('./routes/public');
const adminRoutes = require('./routes/admin');
const { ensureUploadDir } = require('./utils/upload');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = new Koa();

app.use(errorHandler);
app.use(requestLog);
app.use(cors({ origin: '*', credentials: true }));
app.use(rateLimit({ max: 200 }));
app.use(koaBody({
  multipart: true,
  formidable: { maxFileSize: config.upload.maxSize },
  jsonLimit: '10mb',
}));
ensureUploadDir();
app.use(serve(path.resolve(config.upload.dir), { prefix: '/uploads' }));

app.use(publicRoutes.routes()).use(publicRoutes.allowedMethods());
app.use(adminRoutes.routes()).use(adminRoutes.allowedMethods());

app.use(async (ctx) => {
  if (ctx.path === '/health') {
    ctx.body = { status: 'ok' };
    return;
  }
  ctx.status = 404;
  ctx.body = { code: 404, message: 'Not Found', data: null };
});

async function bootstrap() {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    await adminCtrl.initAdmin();
    app.listen(config.port, () => {
      console.log(`济南控创电子官网 API 运行于 http://localhost:${config.port}`);
    });
  } catch (err) {
    console.error('服务启动失败:', err.message);
    process.exit(1);
  }
}

bootstrap();

module.exports = app;
