const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Product = sequelize.define('product', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    imageUrl2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    imageUrl3: {
        type: DataTypes.STRING,
        allowNull: true
    },
    imageUrl4: {
        type: DataTypes.STRING,
        allowNull: true
    },
    //categoryId
});

module.exports = Product;