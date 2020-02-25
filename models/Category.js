// create category model
const DataTypes = require('../lib/datatypes');
const sequelize = require('../lib/db')
const Category = sequelize.define('category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING_UTF8,
        unique: true
    },
    description: {
        type: DataTypes.TEXT_UTF8
    }
});

module.exports = Category