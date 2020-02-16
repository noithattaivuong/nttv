const Admin = require("../models/Admin");

var self = module.exports = {
    getList: async function (req, res, next) {
        try {
            await Admin.findAll().then(user => res.json(user))
        } catch (error) {
            res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },
    getByUsername: async function (req, res, next) {
        try {
            const { username } = req.params;
            let user = await Admin.findOne({
                where: { username: username },
            });
            if (!user) {
                res.status(401).json({
                    error: {
                        message: 'No such user found'
                    }
                })
            }
            user.password = ''
            res.json(user)
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
            var body = req.query;
            // body["password"] = new Encrypt(body["password"]).hash();
            if (!body.username || !body.name || !body.password) {
                res.status(401).json({
                    error: {
                        message: 'Vui lòng điền đầy đủ thông tin'
                    }
                })
            } else {
                let user = await Admin.findOne({
                    where: { username: body.username },
                });
                if (user) {
                    res.status(401).json({
                        error: {
                            message: 'Username is exists'
                        }
                    })
                } else {
                    await Admin.create(body).then(user => {
                        user.password = ''
                        res.json(user)
                    })
                }
            }
        } catch (error) {
            res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },
}