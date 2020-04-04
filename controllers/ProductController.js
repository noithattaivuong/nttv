const Product = require("../models/Product");
const { Op } = require("sequelize");

module.exports = {
    getList: async function (req, res, next) {
        try {
            await Product.findAll().then(product => res.json(product))
        } catch (error) {
            res.errorException(error);
        }
    },
    getListByCategory: async function (req, res, next) {
        try {
            var where = {}
            if (req.params.categoryId) {
                await Product.findAll({ where: { categoryId: req.params.categoryId } }).then(product => res.json(product))
            } else {
                res.json({})
            }
        } catch (error) {
            res.errorException(error);
        }
    },
    getListBySearch: async function (req, res, next) {
        try {
            var where = {}
            if (req.query.name) {
                await Product.findAll({
                    where: {
                        name: {
                            [Op.like]: '%' + req.query.name + '%'
                        }
                    }
                }).then(product => res.json(product))
            } else {
                res.json({})
            }
        } catch (error) {
            res.errorException(error);
        }
    },

    get: async function (req, res, next) {
        try {
            if (!req.params.id) return res.errorParam();
            let product = await Product.findOne({ where: { id: req.params.id } });
            res.sendObject(product, 'product');
        } catch (error) {
            res.errorException(error);
        }
    },
    add: async function (req, res, next) {
        try {
            var body = req.body;
            if (!body.id || !body.name || !body.price) return res.errorParam();
            await Product.create(body).then(product => {
                res.json(product)
            })
        } catch (error) {
            res.errorException(error);
        }
    },
    update: async function (req, res, next) {
        try {
            var body = req.body;
            body.id = req.params.id;
            if (!body.id || !body.name || !body.price) return res.errorParam();

            let product = await Product.findOne({ where: { id: body.id } });
            if (!product) return res.errorNotFound('product');

            await Product.update(body, {
                where: { id: body.id }
            }).then(function (product) {
                res.sendUpdateSucess();
            });

        } catch (error) {
            res.errorException(error);
        }
    },
    delete: async function (req, res, next) {
        try {
            if (!req.params.id) return res.errorParam();
            let product = await Product.findOne({ where: { id: req.params.id } });
            if (!product) return res.errorNotFound('product');
            await Product.destroy({
                where: { id: req.params.id }
            }).then(function (product) {
                res.sendUpdateSucess();
            });

        } catch (error) {
            res.errorException(error);
        }
    },
}