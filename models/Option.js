// create draw model
const Sequelize = require('sequelize');
const sequelize = require('../lib/db')
const Option = sequelize.define('option', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    key: {
        type: Sequelize.STRING,
        unique: true
    },
    value: {
        type: Sequelize.TEXT,
        get() {
            return JSON.parse(this.getDataValue('value'));
        },
        set(val) { // defines the 'setter'
            this.setDataValue('value', JSON.stringify(val));
        }
    },
    description: {
        type: Sequelize.STRING,
    }
});

// create table with product model
Option.sync()
    .then(() => console.log('Option table created successfully'))
    .catch(err => console.log('oooh, did you enter wrong database credentials?'));

module.exports = Option