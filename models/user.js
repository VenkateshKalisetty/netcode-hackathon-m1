const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const { ACCESS_LEVELS } = require('../config');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pwd: {
        type: DataTypes.STRING,
        validate: {
            len: [8, 25]
        },
        allowNull: false,
    },
    access_level: {
        type: DataTypes.STRING,
        validate: {
            isIn: [[ACCESS_LEVELS.USER, ACCESS_LEVELS.ADMIN]]
        },
        defaultValue: ACCESS_LEVELS.USER,
        allowNull: false,
    }
});

module.exports = User;
