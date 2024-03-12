const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const ProductCart = sequelize.define('productCart', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    //userId
    //productId
});

module.exports = ProductCart;