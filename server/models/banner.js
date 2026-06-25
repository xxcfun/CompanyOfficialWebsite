const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Banner = sequelize.define('banners', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(200), allowNull: false, defaultValue: '' },
  subtitle: { type: DataTypes.STRING(500), allowNull: false, defaultValue: '' },
  image_url: { type: DataTypes.STRING(500), allowNull: false, defaultValue: '' },
  link_url: { type: DataTypes.STRING(500), allowNull: false, defaultValue: '' },
  sort_order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  status: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 1 },
}, { tableName: 'banners' });

module.exports = Banner;
