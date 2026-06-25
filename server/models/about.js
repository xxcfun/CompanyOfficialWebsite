const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const About = sequelize.define('about', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  intro: { type: DataTypes.TEXT('medium') },
  history: { type: DataTypes.TEXT('medium') },
  mission: { type: DataTypes.STRING(500), allowNull: false, defaultValue: '成就客户' },
  philosophy: { type: DataTypes.TEXT },
  vision: { type: DataTypes.TEXT },
}, { tableName: 'about' });

module.exports = About;
