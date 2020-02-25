// create product model
const DataTypes = require('../lib/datatypes');
const sequelize = require('../lib/db')
const Category = require('./Category')
const Product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING_UTF8,
    },
    price: {
        type: DataTypes.DECIMAL,
    },
    link: {
        type: DataTypes.STRING,
    },
    size: {
        type: DataTypes.STRING_UTF8,
    },
    material: {
        type: DataTypes.STRING_UTF8,
    },
    categoryId: {
        type: DataTypes.INTEGER,
    },
    description: {
        type: DataTypes.STRING_UTF8,
    }
});

// create table with product model

Product.belongsTo(Category)

// create table with product model
Category.sync()
    .then(() => console.log('Category table created successfully'))
    .catch(err => console.log('Category, did you enter wrong database credentials?'));

Product.sync()
    .then(() => console.log('Product table created successfully'))
    .catch(err => console.log('Product, did you enter wrong database credentials?'));

module.exports = Product