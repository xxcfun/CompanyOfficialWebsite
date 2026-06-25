const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('products', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  type: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 1 },
  name: { type: DataTypes.STRING(200), allowNull: false, defaultValue: '' },
  cover: { type: DataTypes.STRING(500), allowNull: false, defaultValue: '' },
  summary: { type: DataTypes.STRING(1000), allowNull: false, defaultValue: '' },
  content: { type: DataTypes.TEXT('medium') },
  params: { type: DataTypes.TEXT },
  scenes: { type: DataTypes.TEXT },
  industry: { type: DataTypes.STRING(500), allowNull: false, defaultValue: '' },
  seo_title: { type: DataTypes.STRING(200), allowNull: false, defaultValue: '' },
  seo_keywords: { type: DataTypes.STRING(500), allowNull: false, defaultValue: '' },
  seo_description: { type: DataTypes.STRING(500), allowNull: false, defaultValue: '' },
  sort_order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  status: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 1 },
}, { tableName: 'products' });

module.exports = Product;
