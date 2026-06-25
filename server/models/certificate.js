const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Certificate = sequelize.define('certificate', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(200), allowNull: false, defaultValue: '' },
  image_url: { type: DataTypes.STRING(500), allowNull: false, defaultValue: '' },
  summary: { type: DataTypes.STRING(1000), allowNull: false, defaultValue: '' },
  cert_type: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 1 },
  sort_order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  status: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 1 },
}, { tableName: 'certificate' });

module.exports = Certificate;
