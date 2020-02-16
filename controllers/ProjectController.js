const Project = require("../models/Project");

module.exports = {
    getTop: async function (req, res, next) {
        try {
            var n = req.params.n;
            if (!n) {
                n = 3;
            }else{
                n=parseInt(n)
            }
            await Project.findAll({
                limit: n,
                order: [['updatedAt', 'DESC']]
            }).then(project => res.json(project))
        } catch (error) {
            res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },
    getList: async function (req, res, next) {
        try {
            await Project.findAll().then(project => res.json(project))
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
            let project = await Project.findOne({
                where: { ma: ma },
            });
            if (!project) {
                res.status(401).json({
                    error: {
                        message: 'No such project found'
                    }
                })
            }
            res.json(project)
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
            if (!body.name) {
                res.status(401).json({
                    error: {
                        message: 'Vui lòng điền đầy đủ thông tin'
                    }
                })
            } else {
                await Project.create(body).then(project => {
                    res.json(project)
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
            if (!body.ma || !body.name ) {
                return res.status(401).json({
                    error: {
                        message: 'Vui lòng điền đầy đủ thông tin'
                    }
                })
            }

            let project = await Project.findOne({
                where: { ma: body.ma },
            });
            if (!project) {
                return res.status(401).json({
                    error: {
                        message: 'No such project found'
                    }
                })
            }

            await Project.update(body, {
                where: {
                    ma: body.ma
                }
            }).then(function (project) {
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

            let project = await Project.findOne({
                where: { ma: body.ma },
            });
            if (!project) {
                return res.status(401).json({
                    error: {
                        message: 'No such project found'
                    }
                })
            }
            await Project.destroy({
                where: {
                    ma: body.ma
                }
            }).then(function (project) {
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