const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Solution = sequelize.define('solutions', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  category: { type: DataTypes.STRING(100), allowNull: false, defaultValue: '' },
  title: { type: DataTypes.STRING(200), allowNull: false, defaultValue: '' },
  cover: { type: DataTypes.STRING(500), allowNull: false, defaultValue: '' },
  summary: { type: DataTypes.STRING(1000), allowNull: false, defaultValue: '' },
  scene_desc: { type: DataTypes.TEXT },
  devices: { type: DataTypes.TEXT },
  pain_points: { type: DataTypes.TEXT },
  advantages: { type: DataTypes.TEXT },
  service: { type: DataTypes.TEXT },
  content: { type: DataTypes.TEXT('medium') },
  seo_title: { type: DataTypes.STRING(200), allowNull: false, defaultValue: '' },
  seo_keywords: { type: DataTypes.STRING(500), allowNull: false, defaultValue: '' },
  seo_description: { type: DataTypes.STRING(500), allowNull: false, defaultValue: '' },
  sort_order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  status: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 1 },
}, { tableName: 'solutions' });

module.exports = Solution;
