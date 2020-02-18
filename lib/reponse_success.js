
module.exports = {
    sendObject: function (object, mes) {
        if (!object) {
            this.error_notfound(mes)
        }
        this.json(option);
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