const { Sequelize, DataTypes } = require('sequelize');
const { db } = require('../utils/connectDb');

const Order = db.define('orders', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER
  },
  mealId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  totalPrice: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    enum: ['active, cancelled, completed'],
    dafaultValue: 'active'
  }
});

module.exports = {Order};
