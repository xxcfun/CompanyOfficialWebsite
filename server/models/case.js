const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CaseStudy = sequelize.define('cases', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  customer_name: { type: DataTypes.STRING(200), allowNull: false, defaultValue: '' },
  project_scene: { type: DataTypes.STRING(500), allowNull: false, defaultValue: '' },
  devices_used: { type: DataTypes.STRING(500), allowNull: false, defaultValue: '' },
  result: { type: DataTypes.TEXT },
  cover: { type: DataTypes.STRING(500), allowNull: false, defaultValue: '' },
  content: { type: DataTypes.TEXT('medium') },
  location: { type: DataTypes.STRING(100), allowNull: false, defaultValue: '山东' },
  seo_title: { type: DataTypes.STRING(200), allowNull: false, defaultValue: '' },
  seo_keywords: { type: DataTypes.STRING(500), allowNull: false, defaultValue: '' },
  seo_description: { type: DataTypes.STRING(500), allowNull: false, defaultValue: '' },
  sort_order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  status: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 1 },
}, { tableName: 'cases' });

module.exports = CaseStudy;
