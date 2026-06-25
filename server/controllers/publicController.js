const db = require('../models');
const { success } = require('../utils/response');

const enabled = { status: 1 };

exports.getBanners = async (ctx) => {
  const list = await db.Banner.findAll({ where: enabled, order: [['sort_order', 'ASC'], ['id', 'DESC']] });
  success(ctx, list);
};

exports.getHomeAdvantages = async (ctx) => {
  const list = await db.HomeAdvantage.findAll({ where: enabled, order: [['sort_order', 'ASC']] });
  success(ctx, list);
};

exports.getProducts = async (ctx) => {
  const { type, page = 1, pageSize = 12 } = ctx.query;
  const where = { ...enabled };
  if (type) where.type = parseInt(type, 10);
  const limit = Math.min(parseInt(pageSize, 10) || 12, 50);
  const offset = (Math.max(parseInt(page, 10), 1) - 1) * limit;
  const { rows, count } = await db.Product.findAndCountAll({
    where,
    order: [['sort_order', 'ASC'], ['id', 'DESC']],
    limit,
    offset,
    attributes: { exclude: [] },
  });
  success(ctx, { list: rows, total: count, page: parseInt(page, 10), pageSize: limit });
};

exports.getProductDetail = async (ctx) => {
  const item = await db.Product.findOne({
    where: { id: ctx.params.id, ...enabled },
    include: [{ model: db.FileDownload, as: 'downloads', required: false }],
  });
  if (!item) {
    ctx.throw(404, '产品不存在');
  }
  success(ctx, item);
};

exports.getSolutions = async (ctx) => {
  const list = await db.Solution.findAll({ where: enabled, order: [['sort_order', 'ASC'], ['id', 'DESC']] });
  success(ctx, list);
};

exports.getSolutionDetail = async (ctx) => {
  const item = await db.Solution.findOne({ where: { id: ctx.params.id, ...enabled } });
  if (!item) ctx.throw(404, '方案不存在');
  success(ctx, item);
};

exports.getCases = async (ctx) => {
  const { page = 1, pageSize = 10 } = ctx.query;
  const limit = Math.min(parseInt(pageSize, 10) || 10, 50);
  const offset = (Math.max(parseInt(page, 10), 1) - 1) * limit;
  const { rows, count } = await db.CaseStudy.findAndCountAll({
    where: enabled,
    order: [['sort_order', 'ASC'], ['id', 'DESC']],
    limit,
    offset,
  });
  success(ctx, { list: rows, total: count });
};

exports.getCaseDetail = async (ctx) => {
  const item = await db.CaseStudy.findOne({ where: { id: ctx.params.id, ...enabled } });
  if (!item) ctx.throw(404, '案例不存在');
  success(ctx, item);
};

exports.getNews = async (ctx) => {
  const { category, page = 1, pageSize = 10 } = ctx.query;
  const where = { ...enabled };
  if (category) where.category = parseInt(category, 10);
  const limit = Math.min(parseInt(pageSize, 10) || 10, 50);
  const offset = (Math.max(parseInt(page, 10), 1) - 1) * limit;
  const { rows, count } = await db.News.findAndCountAll({
    where,
    order: [['sort_order', 'ASC'], ['publish_time', 'DESC'], ['id', 'DESC']],
    limit,
    offset,
  });
  success(ctx, { list: rows, total: count });
};

exports.getNewsDetail = async (ctx) => {
  const item = await db.News.findOne({ where: { id: ctx.params.id, ...enabled } });
  if (!item) ctx.throw(404, '资讯不存在');
  success(ctx, item);
};

exports.getCertificates = async (ctx) => {
  const list = await db.Certificate.findAll({ where: enabled, order: [['sort_order', 'ASC']] });
  success(ctx, list);
};

exports.getPartners = async (ctx) => {
  const list = await db.Partner.findAll({ where: enabled, order: [['sort_order', 'ASC']] });
  success(ctx, list);
};

exports.getCompanyStrength = async (ctx) => {
  const list = await db.CompanyStrength.findAll({ order: [['sort_order', 'ASC']] });
  success(ctx, list);
};

exports.getAbout = async (ctx) => {
  const item = await db.About.findOne({ order: [['id', 'ASC']] });
  success(ctx, item);
};

exports.getWebsiteConfig = async (ctx) => {
  const item = await db.WebsiteConfig.findOne({ order: [['id', 'ASC']] });
  success(ctx, item);
};

exports.getHomeData = async (ctx) => {
  const [banners, advantages, products, solutions, cases, news, partners, config] = await Promise.all([
    db.Banner.findAll({ where: enabled, order: [['sort_order', 'ASC']], limit: 5 }),
    db.HomeAdvantage.findAll({ where: enabled, order: [['sort_order', 'ASC']] }),
    db.Product.findAll({ where: enabled, order: [['sort_order', 'ASC']], limit: 6 }),
    db.Solution.findAll({ where: enabled, order: [['sort_order', 'ASC']], limit: 4 }),
    db.CaseStudy.findAll({ where: enabled, order: [['sort_order', 'ASC']], limit: 4 }),
    db.News.findAll({ where: enabled, order: [['publish_time', 'DESC']], limit: 5 }),
    db.Partner.findAll({ where: enabled, order: [['sort_order', 'ASC']], limit: 12 }),
    db.WebsiteConfig.findOne({ order: [['id', 'ASC']] }),
  ]);
  success(ctx, { banners, advantages, products, solutions, cases, news, partners, config });
};

exports.downloadFile = async (ctx) => {
  const file = await db.FileDownload.findByPk(ctx.params.id);
  if (!file) ctx.throw(404, '资料不存在');
  success(ctx, { url: file.file_url, name: file.file_name });
};
