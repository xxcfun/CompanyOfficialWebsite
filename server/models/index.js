const sequelize = require('../config/database');
const Banner = require('./banner');
const Product = require('./product');
const Solution = require('./solution');
const CaseStudy = require('./case');
const CompanyStrength = require('./companyStrength');
const About = require('./about');
const Admin = require('./admin');
const News = require('./news');
const Certificate = require('./certificate');
const Partner = require('./partner');
const FileDownload = require('./fileDownload');
const AdminLog = require('./adminLog');
const WebsiteConfig = require('./websiteConfig');
const HomeAdvantage = require('./homeAdvantage');

Product.hasMany(FileDownload, { foreignKey: 'product_id', as: 'downloads' });
FileDownload.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

const db = {
  sequelize,
  Banner,
  Product,
  Solution,
  CaseStudy,
  CompanyStrength,
  About,
  Admin,
  News,
  Certificate,
  Partner,
  FileDownload,
  AdminLog,
  WebsiteConfig,
  HomeAdvantage,
};

module.exports = db;
