const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HomeAdvantage = sequelize.define('home_advantages', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(200), allowNull: false, defaultValue: '' },
  description: { type: DataTypes.STRING(1000), allowNull: false, defaultValue: '' },
  icon: { type: DataTypes.STRING(100), allowNull: false, defaultValue: '' },
  sort_order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  status: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 1 },
}, { tableName: 'home_advantages' });

module.exports = HomeAdvantage;
