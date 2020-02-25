const Project = require("../models/Project");

module.exports = {
    getTop: async function (req, res, next) {
        try {
            var n = parseInt(req.params.n | 3);
            await Project.findAll({
                limit: n,
                order: [['updatedAt', 'DESC']]
            }).then(project => res.json(project))
        } catch (error) {
            res.errorException(error);
        }
    },
    getList: async function (req, res, next) {
        try {
            await Project.findAll().then(project => res.json(project))
        } catch (error) {
            res.errorException(error);
        }
    },
    get: async function (req, res, next) {
        try {
            if (!req.params.id) return res.errorParam();
            let project = await Project.findOne({ where: { id: req.params.id }, });
            if (!project) return res.errorNotFound('project');
            res.json(project)
        } catch (error) {
            res.errorException(error);
        }
    },
    add: async function (req, res, next) {
        try {
            var body = req.body;
            if (!body.name) return res.errorParam();
            await Project.create(body).then(project => {
                res.json(project)
            })
        } catch (error) {
            res.errorException(error);
        }
    },
    update: async function (req, res, next) {
        try {
            var body = req.body;
            body.id = req.params.id;
            if (!body.id || !body.name) return res.errorParam();
            let project = await Project.findOne({ where: { id: body.id }, });
            if (!project) return res.errorNotFound('project');
            await Project.update(body, { where: { id: body.id } }).then(function (project) {
                res.sendUpdateSucess();
            });
        } catch (error) {
            res.errorException(error);
        }
    },
    delete: async function (req, res, next) {
        try {
            if (!req.params.id) return res.errorParam();
            let project = await Project.findOne({ where: { id: req.params.id } });
            if (!project) return res.errorNotFound('project');
            await Project.destroy({ where: { id: req.params.id } }).then(function (project) {
                res.sendUpdateSucess();
            });

        } catch (error) {
            res.errorException(error);
        }
    },
}