const Draw = require("../models/Draw");
const { Op } = require("sequelize");
module.exports = {
    getList: async function (req, res, next) {
        try {
            var username = req.query.username;
            var name = req.query.name;
            var where = {};
            if (username) {
                where.username = username;
            }
            if (name) {
                where.name = {
                    [Op.like]: '%' + name + '%'
                };
            }
            await Draw.findAll(
                { where: where }
            ).then(draw => res.json(draw))
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
            if (!ma) {
                return res.status(401).json({
                    error: {
                        message: 'ma not found'
                    }
                })
            }

            let draw = await Draw.findOne({
                where: { ma: ma },
            });

            if (!draw) {
                return res.status(401).json({
                    error: {
                        message: 'No such draw found'
                    }
                })
            }
            if (req.user && req.user.role == 'user') {
                if (req.user.username != draw.username) {
                    return res.status(401).json({
                        error: {
                            message: 'No such draw found'
                        }
                    })
                }
            }
            res.json(draw)
        } catch (error) {
            res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },
    getOne: async function (req, res, next) {
        try {
            var username = req.params.username;
            var name = req.params.name;
            var where = {};
            if (!username || !name) {
                return res.status(401).json({
                    error: {
                        message: 'name not found'
                    }
                })
            }
            if (username) {
                where.username = username;
            }
            if (name) {
                where.name = name;
            }
            let draw = await Draw.findOne({
                where: where,
            });
            if (!draw) {
                res.status(401).json({
                    error: {
                        message: 'No such draw found'
                    }
                })
            }
            res.json(draw)
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
            if (!body.name || !body.username || !body.value) {
                res.status(401).json({
                    error: {
                        message: 'Vui lòng điền đầy đủ thông tin'
                    }
                })
            } else {
                await Draw.create(body).then(draw => {
                    res.json(draw)
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
            if (!body.ma||!body.name || !body.username || !body.value) {
                return res.status(401).json({
                    error: {
                        message: 'Vui lòng điền đầy đủ thông tin'
                    }
                })
            }

            let draw = await Draw.findOne({
                where: { ma: body.ma },
            });
            if (!draw) {
                return res.status(401).json({
                    error: {
                        message: 'No such draw found'
                    }
                })
            }

            if (req.user && req.user.role == 'user') {
                if (req.user.username != draw.username) {
                    return res.status(401).json({
                        error: {
                            message: 'No such draw found'
                        }
                    })
                }
            }

            await Draw.update(body, {
                where: {
                    ma: body.ma
                }
            }).then(function (draw) {
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

            let draw = await Draw.findOne({
                where: { ma: body.ma },
            });
            if (!draw) {
                return res.status(401).json({
                    error: {
                        message: 'No such draw found'
                    }
                })
            }

            if (req.user && req.user.role == 'user') {
                if (req.user.username != draw.username) {
                    return res.status(401).json({
                        error: {
                            message: 'No such draw found'
                        }
                    })
                }
            }

            await Draw.destroy({
                where: {
                    ma: body.ma
                }
            }).then(function (draw) {
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