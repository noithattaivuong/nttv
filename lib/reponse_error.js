
module.exports = {
    error_param: function (mes) {
        var str = 'Vui lòng điền đầy đủ thông tins';
        if (mes)
            str = mes;
        return this.status(400).json({
            error: {
                type: 'param',
                message: str
            }
        })
    },
    error_found: function (object) {
        return this.status(400).json({
            error: {
                type: 'notfound',
                message: object + ' exists'
            }
        })
    },
    error_notfound: function (object) {
        return this.status(400).json({
            error: {
                type: 'notfound',
                message: 'No such ' + object + ' found'
            }
        })
    },
    error_exception: function (error) {
        return this.status(400).json({
            error: {
                type: 'exception',
                message: error.message
            }
        })
    },
}