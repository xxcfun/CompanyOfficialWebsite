const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Admin = sequelize.define('admin', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(200), allowNull: false },
  login_fail_count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  lock_until: { type: DataTypes.DATE, allowNull: true },
}, { tableName: 'admin' });

module.exports = Admin;
