const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const svgCaptcha = require('svg-captcha');
const { v4: uuidv4 } = require('uuid');
const db = require('../models');
const config = require('../config');
const { success, fail } = require('../utils/response');
const { setCaptcha, verifyCaptcha } = require('../utils/captchaStore');
const { writeAdminLog } = require('../utils/logger');
const { saveUpload } = require('../utils/upload');

function getIp(ctx) {
  return ctx.headers['x-forwarded-for']?.split(',')[0] || ctx.ip;
}

exports.getCaptcha = async (ctx) => {
  const captcha = svgCaptcha.create({ size: 4, noise: 2, color: true, background: '#f0f4f8' });
  const id = uuidv4();
  setCaptcha(id, captcha.text);
  success(ctx, { captchaId: id, svg: captcha.data });
};

exports.login = async (ctx) => {
  const { username, password, captchaId, captcha } = ctx.request.body || {};
  if (!verifyCaptcha(captchaId, captcha)) return fail(ctx, '验证码错误');
  const admin = await db.Admin.findOne({ where: { username } });
  if (!admin) return fail(ctx, '账号或密码错误');
  if (admin.lock_until && new Date(admin.lock_until) > new Date()) {
    return fail(ctx, '账号已锁定，请稍后再试');
  }
  const ok = await bcrypt.compare(password, admin.password);
  if (!ok) {
    const count = admin.login_fail_count + 1;
    const updates = { login_fail_count: count };
    if (count >= config.admin.maxLoginFail) {
      updates.lock_until = new Date(Date.now() + config.admin.lockMinutes * 60000);
      updates.login_fail_count = 0;
    }
    await admin.update(updates);
    return fail(ctx, '账号或密码错误');
  }
  await admin.update({ login_fail_count: 0, lock_until: null });
  const token = jwt.sign({ id: admin.id, username: admin.username }, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
  await writeAdminLog(admin.id, admin.username, '管理员登录', getIp(ctx));
  success(ctx, { token, username: admin.username });
};

exports.logout = async (ctx) => {
  await writeAdminLog(ctx.state.admin.id, ctx.state.admin.username, '退出登录', getIp(ctx));
  success(ctx);
};

exports.changePassword = async (ctx) => {
  const { oldPassword, newPassword } = ctx.request.body || {};
  const admin = await db.Admin.findByPk(ctx.state.admin.id);
  const ok = await bcrypt.compare(oldPassword, admin.password);
  if (!ok) return fail(ctx, '原密码错误');
  await admin.update({ password: await bcrypt.hash(newPassword, 10) });
  await writeAdminLog(admin.id, admin.username, '修改密码', getIp(ctx));
  success(ctx);
};

exports.dashboard = async (ctx) => {
  const [products, solutions, cases, news, logs] = await Promise.all([
    db.Product.count(),
    db.Solution.count(),
    db.CaseStudy.count(),
    db.News.count(),
    db.AdminLog.findAll({ order: [['id', 'DESC']], limit: 10 }),
  ]);
  success(ctx, { products, solutions, cases, news, visitCount: 0, logs });
};

async function crudList(Model, ctx, whereExtra = {}) {
  const { page = 1, pageSize = 20, status } = ctx.query;
  const where = { ...whereExtra };
  if (status !== undefined && status !== '') where.status = parseInt(status, 10);
  const limit = Math.min(parseInt(pageSize, 10) || 20, 100);
  const offset = (Math.max(parseInt(page, 10), 1) - 1) * limit;
  const { rows, count } = await Model.findAndCountAll({
    where,
    order: [['sort_order', 'ASC'], ['id', 'DESC']],
    limit,
    offset,
  });
  success(ctx, { list: rows, total: count });
}

exports.bannerList = (ctx) => crudList(db.Banner, ctx);
exports.bannerSave = async (ctx) => {
  const body = ctx.request.body || {};
  let item;
  if (body.id) {
    item = await db.Banner.findByPk(body.id);
    await item.update(body);
  } else {
    item = await db.Banner.create(body);
  }
  await writeAdminLog(ctx.state.admin.id, ctx.state.admin.username, `轮播图保存:${item.id}`, getIp(ctx));
  success(ctx, item);
};
exports.bannerDelete = async (ctx) => {
  await db.Banner.destroy({ where: { id: ctx.params.id } });
  await writeAdminLog(ctx.state.admin.id, ctx.state.admin.username, `轮播图删除:${ctx.params.id}`, getIp(ctx));
  success(ctx);
};

exports.productList = (ctx) => {
  const where = {};
  if (ctx.query.type) where.type = parseInt(ctx.query.type, 10);
  return crudList(db.Product, ctx, where);
};
exports.productSave = async (ctx) => {
  const body = ctx.request.body || {};
  let item;
  if (body.id) {
    item = await db.Product.findByPk(body.id);
    await item.update(body);
  } else {
    item = await db.Product.create(body);
  }
  await writeAdminLog(ctx.state.admin.id, ctx.state.admin.username, `产品保存:${item.id}`, getIp(ctx));
  success(ctx, item);
};
exports.productDelete = async (ctx) => {
  await db.Product.destroy({ where: { id: ctx.params.id } });
  await db.FileDownload.destroy({ where: { product_id: ctx.params.id } });
  success(ctx);
};
exports.productFiles = async (ctx) => {
  const list = await db.FileDownload.findAll({ where: { product_id: ctx.params.productId }, order: [['sort_order', 'ASC']] });
  success(ctx, list);
};
exports.productFileSave = async (ctx) => {
  const body = ctx.request.body || {};
  let item;
  if (body.id) {
    item = await db.FileDownload.findByPk(body.id);
    await item.update(body);
  } else {
    item = await db.FileDownload.create(body);
  }
  success(ctx, item);
};
exports.productFileDelete = async (ctx) => {
  await db.FileDownload.destroy({ where: { id: ctx.params.id } });
  success(ctx);
};

exports.solutionList = (ctx) => crudList(db.Solution, ctx);
exports.solutionSave = async (ctx) => {
  const body = ctx.request.body || {};
  let item;
  if (body.id) { item = await db.Solution.findByPk(body.id); await item.update(body); }
  else { item = await db.Solution.create(body); }
  success(ctx, item);
};
exports.solutionDelete = async (ctx) => {
  await db.Solution.destroy({ where: { id: ctx.params.id } });
  success(ctx);
};

exports.caseList = (ctx) => crudList(db.CaseStudy, ctx);
exports.caseSave = async (ctx) => {
  const body = ctx.request.body || {};
  let item;
  if (body.id) { item = await db.CaseStudy.findByPk(body.id); await item.update(body); }
  else { item = await db.CaseStudy.create(body); }
  success(ctx, item);
};
exports.caseDelete = async (ctx) => {
  await db.CaseStudy.destroy({ where: { id: ctx.params.id } });
  success(ctx);
};

exports.newsList = (ctx) => crudList(db.News, ctx);
exports.newsSave = async (ctx) => {
  const body = ctx.request.body || {};
  let item;
  if (body.id) { item = await db.News.findByPk(body.id); await item.update(body); }
  else { item = await db.News.create(body); }
  success(ctx, item);
};
exports.newsDelete = async (ctx) => {
  await db.News.destroy({ where: { id: ctx.params.id } });
  success(ctx);
};

exports.certList = (ctx) => crudList(db.Certificate, ctx);
exports.certSave = async (ctx) => {
  const body = ctx.request.body || {};
  let item;
  if (body.id) { item = await db.Certificate.findByPk(body.id); await item.update(body); }
  else { item = await db.Certificate.create(body); }
  success(ctx, item);
};
exports.certDelete = async (ctx) => {
  await db.Certificate.destroy({ where: { id: ctx.params.id } });
  success(ctx);
};

exports.partnerList = (ctx) => crudList(db.Partner, ctx);
exports.partnerSave = async (ctx) => {
  const body = ctx.request.body || {};
  let item;
  if (body.id) { item = await db.Partner.findByPk(body.id); await item.update(body); }
  else { item = await db.Partner.create(body); }
  success(ctx, item);
};
exports.partnerDelete = async (ctx) => {
  await db.Partner.destroy({ where: { id: ctx.params.id } });
  success(ctx);
};

exports.strengthList = async (ctx) => {
  const list = await db.CompanyStrength.findAll({ order: [['sort_order', 'ASC']] });
  success(ctx, list);
};
exports.strengthSave = async (ctx) => {
  const body = ctx.request.body || {};
  let item;
  if (body.id) { item = await db.CompanyStrength.findByPk(body.id); await item.update(body); }
  else { item = await db.CompanyStrength.create(body); }
  success(ctx, item);
};

exports.aboutGet = async (ctx) => {
  const item = await db.About.findOne({ order: [['id', 'ASC']] });
  success(ctx, item);
};
exports.aboutSave = async (ctx) => {
  const body = ctx.request.body || {};
  let item = await db.About.findOne({ order: [['id', 'ASC']] });
  if (item) await item.update(body);
  else item = await db.About.create(body);
  success(ctx, item);
};

exports.configGet = async (ctx) => {
  const item = await db.WebsiteConfig.findOne({ order: [['id', 'ASC']] });
  success(ctx, item);
};
exports.configSave = async (ctx) => {
  const body = ctx.request.body || {};
  let item = await db.WebsiteConfig.findOne({ order: [['id', 'ASC']] });
  if (item) await item.update(body);
  else item = await db.WebsiteConfig.create(body);
  success(ctx, item);
};

exports.advantageList = (ctx) => crudList(db.HomeAdvantage, ctx);
exports.advantageSave = async (ctx) => {
  const body = ctx.request.body || {};
  let item;
  if (body.id) { item = await db.HomeAdvantage.findByPk(body.id); await item.update(body); }
  else { item = await db.HomeAdvantage.create(body); }
  success(ctx, item);
};
exports.advantageDelete = async (ctx) => {
  await db.HomeAdvantage.destroy({ where: { id: ctx.params.id } });
  success(ctx);
};

exports.logList = async (ctx) => {
  const { page = 1, pageSize = 20 } = ctx.query;
  const limit = Math.min(parseInt(pageSize, 10) || 20, 100);
  const offset = (Math.max(parseInt(page, 10), 1) - 1) * limit;
  const { rows, count } = await db.AdminLog.findAndCountAll({
    order: [['id', 'DESC']],
    limit,
    offset,
  });
  success(ctx, { list: rows, total: count });
};

exports.upload = async (ctx) => {
  const file = ctx.request.files?.file;
  if (!file) return fail(ctx, '请选择文件');
  const type = ctx.query.type === 'doc' ? 'doc' : 'image';
  const url = saveUpload(Array.isArray(file) ? file[0] : file, type);
  success(ctx, { url });
};

exports.initAdmin = async () => {
  const count = await db.Admin.count();
  if (count === 0) {
    const hash = await bcrypt.hash(config.admin.defaultPass, 10);
    await db.Admin.create({ username: config.admin.defaultUser, password: hash });
    console.log(`默认管理员已创建: ${config.admin.defaultUser} / ${config.admin.defaultPass}`);
  }
};
