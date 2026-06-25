const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const News = sequelize.define('news', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  category: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 1 },
  title: { type: DataTypes.STRING(200), allowNull: false, defaultValue: '' },
  cover: { type: DataTypes.STRING(500), allowNull: false, defaultValue: '' },
  summary: { type: DataTypes.STRING(1000), allowNull: false, defaultValue: '' },
  content: { type: DataTypes.TEXT('medium') },
  publish_time: { type: DataTypes.DATE },
  seo_title: { type: DataTypes.STRING(200), allowNull: false, defaultValue: '' },
  seo_keywords: { type: DataTypes.STRING(500), allowNull: false, defaultValue: '' },
  seo_description: { type: DataTypes.STRING(500), allowNull: false, defaultValue: '' },
  sort_order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  status: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 1 },
}, { tableName: 'news' });

module.exports = News;
