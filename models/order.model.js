const {DataTypes} = require('sequelize');
const {db} = require('../database/db');

const Order = db.define('orders', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    mealId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId : {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    totalPrice: {
        type:DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    quantity: {
        type:DataTypes.INTEGER,
        allowNull:false
    },
    status: {
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue: 'active',
    }
});

module.exports = Order;