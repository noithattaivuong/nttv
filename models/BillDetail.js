// create BillDetail model
const DataTypes = require('../lib/datatypes');
const sequelize = require('../lib/db')

const BillDetail = sequelize.define('billdetail', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    billId: {
        type: DataTypes.STRING,
    },
    productId: {
        type: DataTypes.INTEGER,
    },
    count: {
        type: DataTypes.INTEGER,
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



BillDetail.sync()
    .then(() => console.log('BillDetail table created successfully'))
    .catch(err => console.log('BillDetail, did you enter wrong database credentials?'));

module.exports = BillDetail 
