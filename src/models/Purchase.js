const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Purchase = sequelize.define('purchase', {
  //userId
  //productId
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Purchase;
