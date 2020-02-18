// create product model
const DataTypes = require('../lib/datatypes');
const sequelize = require('../lib/db')
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
    description: {
        type: DataTypes.STRING_UTF8,
    }
});

// create table with product model
Product.sync()
    .then(() => console.log('Product table created successfully'))
    .catch(err => console.log('oooh, did you enter wrong database credentials?'));

module.exports = Product