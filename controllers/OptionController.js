const Option = require("../models/Option");
function getWhere(data) {
    var where = {}
    if (data.id) {
        where.id = data.id;
    } else {
        where.key = data.key;
    }
    return where;
}

module.exports = {
    getList: async function (req, res, next) {
        try {
            await Option.findAll().then(option => res.json(option))
        } catch (error) {
            res.errorException(error);
        }
    },
    get: async function (req, res, next) {
        try {
            if (!req.params.id || !req.params.key) return res.errorParam();
            var where = getWhere(req.params);
            let option = await Option.findOne({ where: where });
            res.sendObject(option);
        } catch (error) {
            res.errorException(error);
        }
    },
    add: async function (req, res, next) {
        try {
            var body = req.body;
            if (!body.key || !body.value) return res.errorParam();
            let option = await Option.findOne({ where: getWhere(req.body) });
            if (option) return res.errorFound('option by key ' + body.key);
            await Option.create(body).then(option => {
                res.sendObject(option);
            })
        } catch (error) {
            res.errorException(error);
        }
    },
    update: async function (req, res, next) {
        try {
            var body = req.body;
            body.id = req.params.id;
            if (!body.key || !body.value) return res.errorParam();
            let option = await Option.findOne({ where: getWhere(req.body) });
            if (!option) return res.errorNotFound('option');
            await Option.update(body, { where: { id: option.id } }).then(data => {
                res.sendUpdateSucess();
            })
        } catch (error) {
            res.errorException(error);
        }
    },
    delete: async function (req, res, next) {
        try {
            if (!req.params.id) return res.errorParam();
            let option = await Option.findOne({ where: { id: req.params.id } });
            if (!option) return res.errorNotFound('option with id=' + req.params.id);
            var id = option.id;
            await Option.destroy({ where: { id: req.params.id } }).then(data => {
                res.sendUpdateSucess();
            })
        } catch (error) {
            res.errorException(error);
        }
    },
}