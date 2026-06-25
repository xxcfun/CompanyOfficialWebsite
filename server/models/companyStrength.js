const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CompanyStrength = sequelize.define('company_strength', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  section_key: { type: DataTypes.STRING(50), allowNull: false, defaultValue: '' },
  title: { type: DataTypes.STRING(200), allowNull: false, defaultValue: '' },
  content: { type: DataTypes.TEXT('medium') },
  image_url: { type: DataTypes.STRING(500), allowNull: false, defaultValue: '' },
  sort_order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
}, { tableName: 'company_strength' });

module.exports = CompanyStrength;
