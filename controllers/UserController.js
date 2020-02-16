const User = require("../models/User");

var self = module.exports = {
    getList: async function (req, res, next) {
        try {
            await User.findAll().then(user => res.json(user))
        } catch (error) {
            return  res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },
    getByUsername: async function (req, res, next) {
        try {
            const { username } = req.params;
            let user = await User.findOne({
                where: { username: username },
            });
            if (!user) {
                return res.status(401).json({
                    error: {
                        message: 'No such user found'
                    }
                })
            }
            user.password = ''
            res.json(user)
        } catch (error) {
            return res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },
    add: async function (req, res, next) {
        try {
            var body = req.body;
            // body["password"] = new Encrypt(body["password"]).hash();
            if (!body.username || !body.name || !body.password) {
                res.status(401).json({
                    error: {
                        message: 'Vui lòng điền đầy đủ thông tin'
                    }
                })
            } else {
                let user = await User.findOne({
                    where: { username: body.username },
                });
                if (user) {
                    res.status(401).json({
                        error: {
                            message: 'Username is exists'
                        }
                    })
                } else {
                    await User.create(body).then(user => {
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