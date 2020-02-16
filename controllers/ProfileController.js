const User = require("../models/User");
const Draw = require("../models/Draw");
const UserController = require("./UserController");
const DrawController = require("./DrawController");

module.exports = {
    getProfile: async function (req, res, next) {
        try {
            req.params.username = req.user.username;
            return await UserController.getByUsername(req, res, next);
        } catch (error) {
            return res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },
    getDraw: async function (req, res, next) {
        try {
            req.query.username = req.user.username;
            return await DrawController.getList(req,res,next);
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
            return await DrawController.get(req,res,next);
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
            return await DrawController.getOne(req,res,next);
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
            req.params.username = req.user.username;
            return await DrawController.add(req,res,next);
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
            return await DrawController.update(req,res,next);
        } catch (error) {
            res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },
}