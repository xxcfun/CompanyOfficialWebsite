const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AdminLog = sequelize.define('admin_log', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  admin_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
  admin_name: { type: DataTypes.STRING(50), allowNull: false, defaultValue: '' },
  action: { type: DataTypes.STRING(500), allowNull: false, defaultValue: '' },
  ip: { type: DataTypes.STRING(50), allowNull: false, defaultValue: '' },
}, { tableName: 'admin_log' });

module.exports = AdminLog;
