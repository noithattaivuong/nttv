const Option = require("../models/Option");

module.exports = {
    getList: async function (req, res, next) {
        try {
            await Option.findAll().then(option => res.json(option))
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
            let option = await Option.findOne({
                where: { ma: ma },
            });
            if (!option) {
                return res.status(400).json({
                    error: {
                        message: 'No such option found'
                    }
                })
            }
            res.json(option)
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
            if (!body.key || !body.value) {
                return res.status(400).json({
                    error: {
                        message: 'Vui lòng điền đầy đủ thông tin'
                    }
                })
            } else {
                await Option.create(body).then(option => {
                    res.json(option)
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
            if (!body.ma || !body.key || !body.value) {
                return res.status(400).json({
                    error: {
                        message: 'Vui lòng điền đầy đủ thông tin'
                    }
                })
            }

            let option = await Option.findOne({
                where: { ma: body.ma },
            });
            if (!option) {
                return res.status(400).json({
                    error: {
                        message: 'No such option found'
                    }
                })
            }

            await Option.update(body, {
                where: {
                    ma: body.ma
                }
            }).then(function (option) {
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
                return res.status(400).json({
                    error: {
                        message: 'Vui lòng điền đầy đủ thông tin'
                    }
                })
            }

            let option = await Option.findOne({
                where: { ma: body.ma },
            });
            if (!option) {
                return res.status(400).json({
                    error: {
                        message: 'No such option found'
                    }
                })
            }
            await Option.destroy({
                where: {
                    ma: body.ma
                }
            }).then(function (option) {
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