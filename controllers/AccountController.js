const passport = require("passport");
const jwt = require('jsonwebtoken');
const config = require("../lib/config");
const User = require("../models/User");
const Admin = require("../models/Admin");


const checkValidDataForLogin = function (username, password) {
    let success = true;
    let error = {};
    if (!username || username.trim().length === 0) {
        success = false;
        error["password"] = "Tài khoản không được để trống.";
    }
    if (!password || password.trim().length === 0) {
        success = false;
        error["username"] = "Mật khẩu không được để trống.";
    }
    return {
        success,
        error
    };
};

module.exports = {
    login: async function (req, res, next) {
        const {
            username,
            password
        } = req.body;
        let valid = checkValidDataForLogin(username, password);
        if (!valid.success) {
            return res.status(400).json({
                error: valid.error
            });
        }
        let user = await User.findOne({
            where: { username: username },
        });
        if (user == null) {
            return res.status(400).json({
                error: 'Username not exists'
            });
        }
        if (user.password != password) {
            return res.status(400).json({
                error: 'password wrong'
            });
        }

        let payload = { username: username, role: 'user', profile: user };
        let token = jwt.sign(payload, config.token_generator.secret_key, { expiresIn: config.token_generator.expires_in });
        return res.json({
            token: token,
            role: 'user'
        });
    },
    login_admin: async function (req, res, next) {
        const {
            username,
            password
        } = req.body;
        let valid = checkValidDataForLogin(username, password);
        if (!valid.success) {
            return res.status(400).json({
                error: valid.error
            });
        }
        let user = await Admin.findOne({
            where: { username: username },
        });
        if (user == null) {
            return res.status(400).json({
                error: 'Username not exists'
            });
        }
        if (user.password != password) {
            return res.status(400).json({
                error: 'password wrong'
            });
        }

        let payload = { username: username, role: 'admin', profile: user };
        let token = jwt.sign(payload, config.token_generator.secret_key, { expiresIn: config.token_generator.expires_in });
        return res.json({
            token: token,
            role: 'admin'
        });
    },
    register: async function (req, res, next) {
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
    register_admin: async function (req, res, next) {
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
    }
};