const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const WebsiteConfig = sequelize.define('website_config', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  site_name: { type: DataTypes.STRING(200), allowNull: false, defaultValue: '济南控创电子科技有限公司' },
  icp_number: { type: DataTypes.STRING(100), allowNull: false, defaultValue: '' },
  police_number: { type: DataTypes.STRING(100), allowNull: false, defaultValue: '' },
  copyright: { type: DataTypes.STRING(500), allowNull: false, defaultValue: '' },
  phone: { type: DataTypes.STRING(50), allowNull: false, defaultValue: '' },
  address: { type: DataTypes.STRING(500), allowNull: false, defaultValue: '' },
  work_time: { type: DataTypes.STRING(200), allowNull: false, defaultValue: '' },
  map_embed: { type: DataTypes.TEXT },
  global_seo_title: { type: DataTypes.STRING(200), allowNull: false, defaultValue: '' },
  global_seo_keywords: { type: DataTypes.STRING(500), allowNull: false, defaultValue: '' },
  global_seo_description: { type: DataTypes.STRING(500), allowNull: false, defaultValue: '' },
  home_advantages: { type: DataTypes.TEXT },
}, { tableName: 'website_config' });

module.exports = WebsiteConfig;
