const ResError = require('./reponse_error')

module.exports = {
    sendObject: function (object, mes) {
        if (!object) {
            this.error_notfound = ResError.error_notfound;
            return this.error_notfound(mes)
        }
        this.json(object);
    },
    sendUpdateSucess: function (mes) {
        var str = 'Update success'
        if (mes) {
            str = mes;
        }
        this.json({
            success: {
                message: str
            }
        })
    },
}