const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Partner = sequelize.define('partner', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(200), allowNull: false, defaultValue: '' },
  logo_url: { type: DataTypes.STRING(500), allowNull: false, defaultValue: '' },
  sort_order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  status: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 1 },
}, { tableName: 'partner' });

module.exports = Partner;
