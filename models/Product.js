// create product model
const Sequelize = require('sequelize');
const sequelize = require('../lib/db')
const Product = sequelize.define('product', {
    ma: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
    },
    price: {
        type: Sequelize.DECIMAL,
    },
    link: {
        type: Sequelize.STRING,
    },
    size: {
        type: Sequelize.STRING,
    },
    material: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
    }
});

// create table with product model
Product.sync()
    .then(() => console.log('Product table created successfully'))
    .catch(err => console.log('oooh, did you enter wrong database credentials?'));

module.exports = Product