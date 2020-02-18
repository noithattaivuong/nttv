const Product = require("../models/Product");

module.exports = {
    getList: async function (req, res, next) {
        try {
            await Product.findAll().then(product => res.json(product))
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
            if (!body.name || !body.price) return res.errorParam();
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
            let product = await Product.findOne({ where: { id: body.id } });
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