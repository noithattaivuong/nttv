// create product model
const DataTypes = require('../lib/datatypes');
const sequelize = require('../lib/db')
const BillDetail = require('./BillDetail')

const Bill = sequelize.define('bill', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
    },
    count: {
        type: DataTypes.INTEGER,
    },
    total: {
        type: DataTypes.DECIMAL,
    },
    status: {
        type: DataTypes.INTEGER,
        get() {
            var val = this.getDataValue('status')
            switch (val) {
                case 0:
                    return 'Đặt hàng'
                case 1:
                    return 'Vận chuyển'
                case 2:
                    return 'Hoàn thành'
            }
        }
    },
    description: {
        type: DataTypes.STRING_UTF8,
    },
    detail: DataTypes.VIRTUAL
});

// create table with product model
Bill.sync()
    .then(() => console.log('Bill table created successfully'))
    .catch(err => console.log('oooh, did you enter wrong database credentials?'));

module.exports = Bill