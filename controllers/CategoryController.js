const Category = require("../models/Category");

module.exports = {
    getList: async function (req, res, next) {
        try {
            await Category.findAll().then(category => res.json(category))
        } catch (error) {
            res.errorException(error);
        }
    },
    get: async function (req, res, next) {
        try {
            if (!req.params.id) return res.errorParam();
            let category = await Category.findOne({ where: { id: req.params.id }, });
            if (!category) return res.errorNotFound('category');
            res.json(category)
        } catch (error) {
            res.errorException(error);
        }
    },
    add: async function (req, res, next) {
        try {
            var body = req.body;
            if (!body.name) return res.errorParam();
            await Category.create(body).then(category => {
                res.json(category)
            })
        } catch (error) {
            res.errorException(error);
        }
    },
    update: async function (req, res, next) {
        try {
            var body = req.body;
            body.id = req.params.id;
            if (!body.id || !body.name) return res.errorParam();
            let category = await Category.findOne({ where: { id: body.id }, });
            if (!category) return res.errorNotFound('category');
            await Category.update(body, { where: { id: body.id } }).then(function (category) {
                res.sendUpdateSucess();
            });
        } catch (error) {
            res.errorException(error);
        }
    },
    delete: async function (req, res, next) {
        try {
            if (!req.params.id) return res.errorParam();
            let category = await Category.findOne({ where: { id: req.params.id } });
            if (!category) return res.errorNotFound('category');
            await Category.destroy({ where: { id: req.params.id } }).then(function (category) {
                res.sendUpdateSucess();
            });

        } catch (error) {
            res.errorException(error);
        }
    },
}