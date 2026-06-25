const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FileDownload = sequelize.define('file_download', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  product_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
  file_name: { type: DataTypes.STRING(200), allowNull: false, defaultValue: '' },
  file_url: { type: DataTypes.STRING(500), allowNull: false, defaultValue: '' },
  sort_order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
}, { tableName: 'file_download' });

module.exports = FileDownload;
