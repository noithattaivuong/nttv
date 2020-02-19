const Sequelize = require('sequelize');
module.exports = {
    INTEGER: Sequelize.INTEGER(11),
    DECIMAL: Sequelize.DECIMAL,
    VIRTUAL: Sequelize.VIRTUAL,
    TEXT: Sequelize.TEXT,
    STRING: Sequelize.STRING,
    TEXT_UTF8: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_unicode_ci',
    STRING_UTF8: 'VARCHAR(255) CHARSET utf8 COLLATE utf8_unicode_ci'
}