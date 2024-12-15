const { DataTypes } = require('sequelize');
const sequelize = require('../db-config');

const User = sequelize.define('managers', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  super: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
});

module.exports = User;