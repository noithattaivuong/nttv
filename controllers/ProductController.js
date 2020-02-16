const Product = require("../models/Product");

module.exports = {
    getList: async function (req, res, next) {
        try {
            await Product.findAll().then(product => res.json(product))
        } catch (error) {
            res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },
    get: async function (req, res, next) {
        try {
            const { ma } = req.params;
            let product = await Product.findOne({
                where: { ma: ma },
            });
            if (!product) {
                res.status(401).json({
                    error: {
                        message: 'No such product found'
                    }
                })
            }
            res.json(product)
        } catch (error) {
            res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },
    add: async function (req, res, next) {
        try {
            var body = req.body;
            if (!body.name || !body.price) {
                res.status(401).json({
                    error: {
                        message: 'Vui lòng điền đầy đủ thông tin'
                    }
                })
            } else {
                await Product.create(body).then(product => {
                    res.json(product)
                })
            }
        } catch (error) {
            res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },
    update: async function (req, res, next) {
        try {
            var body = req.body;
            body.ma = req.params.ma;
            console.log(body);
            if (!body.ma || !body.name || !body.price) {
                return res.status(401).json({
                    error: {
                        message: 'Vui lòng điền đầy đủ thông tin'
                    }
                })
            }

            let product = await Product.findOne({
                where: { ma: body.ma },
            });
            if (!product) {
                return res.status(401).json({
                    error: {
                        message: 'No such product found'
                    }
                })
            }

            await Product.update(body, {
                where: {
                    ma: body.ma
                }
            }).then(function (product) {
                res.status(200).json({
                    success: {
                        message: 'Update success'
                    }
                })
            });

        } catch (error) {
            res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },
    delete: async function (req, res, next) {
        try {
            var body = req.body;
            body.ma = req.params.ma;

            if (!body.ma) {
                return res.status(401).json({
                    error: {
                        message: 'Vui lòng điền đầy đủ thông tin'
                    }
                })
            }

            let product = await Product.findOne({
                where: { ma: body.ma },
            });
            if (!product) {
                return res.status(401).json({
                    error: {
                        message: 'No such product found'
                    }
                })
            }
            await Product.destroy({
                where: {
                    ma: body.ma
                }
            }).then(function (product) {
                res.status(200).json({
                    success: {
                        message: 'Update success'
                    }
                })
            });

        } catch (error) {
            res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },
}