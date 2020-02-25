const User = require("../models/User");
const Draw = require("../models/Draw");
const UserController = require("./UserController");
const DrawController = require("./DrawController");
const BillController = require("./BillController");

module.exports = {
    getProfile: async function (req, res, next) {
        try {
            req.params.username = req.user.username;
            return await UserController.getByUsername(req, res, next);
        } catch (error) {
            res.errorException(error);
        }
    },
    updateProfile: async function (req, res, next) {
        try {
            req.params.username = req.user.username;
            delete req.body.password;
            return await UserController.update(req, res, next);
        } catch (error) {
            res.errorException(error);
        }
    },
    changePassword: async function (req, res, next) {
        try {
            var username = req.user.username;
            var body = req.body;
            if (!body.password || !body.passwordNew || body.passwordNew.length == 0) return res.errorParam();
            let user = await User.findOne({ where: { username: username } });
            if (!user) return res.errorNotFound('user');
            if (user.password != body.password) return res.errorParam('Password khong dung');
            await User.update({ password: body.passwordNew }, { where: { username: username } }).then(function (user) {
                res.sendUpdateSucess();
            });
        } catch (error) {
            res.errorException(error);
        }
    },

    getDraw: async function (req, res, next) {
        try {
            req.query.username = req.user.username;
            return await DrawController.getList(req, res, next);
        } catch (error) {
            res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },
    getDrawByMa: async function (req, res, next) {
        try {
            req.params.username = req.user.username;
            return await DrawController.get(req, res, next);
        } catch (error) {
            res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },
    getDrawByName: async function (req, res, next) {
        try {
            req.params.username = req.user.username;
            return await DrawController.getOne(req, res, next);
        } catch (error) {
            res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },
    addDraw: async function (req, res, next) {
        try {
            req.body.username = req.user.username;
            return await DrawController.add(req, res, next);
        } catch (error) {
            res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },
    updateDraw: async function (req, res, next) {
        try {
            req.body.username = req.user.username;
            return await DrawController.update(req, res, next);
        } catch (error) {
            res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },
    getListBill: async function (req, res, next) {
        try {
            req.params.username = req.user.username;
            return await BillController.getList(req, res, next);
        } catch (error) {
            res.errorException(error);
        }
    },
     getBill: async function (req, res, next) {
        try {
            req.params.username = req.user.username;
            return await BillController.get(req, res, next);
        } catch (error) {
            res.errorException(error);
        }
    },
}