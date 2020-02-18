const ClientRouter = require('./ClientRouter')
const UserRouter = require('./UserRouter')
const DrawRouter = require('./DrawRouter')
const ProfileRouter = require('./ProfileRouter')
const ProductRouter = require('./ProductRouter')
const OptionRouter = require('./OptionRouter')
const AccountRouter = require('./AccountRouter')
const ProjectRouter = require('./ProjectRouter')
const createError = require('http-errors')
const authenticate = require('../lib/authenticate')
const ResError = require("../lib/reponse_error");
const ResSuccess = require("../lib/reponse_success");

module.exports = (app) => {

    app.get('/', function (req, res, next) {
        res.send('hello word')
    })

    app.use(function (req, res, next) {
        res.errorException = ResError.error_exception;
        res.errorParam = ResError.error_param;
        res.errorFound = ResError.error_found;
        res.errorNotFound = ResError.error_notfound;
        res.sendObject = ResSuccess.sendObject;
        res.sendUpdateSucess = ResSuccess.sendUpdateSucess;
        next();
    })

    app.use('/client', ClientRouter)
    app.use('/account', AccountRouter)
    app.use('/product', ProductRouter)
    app.use('/project', ProjectRouter)
    app.use('/profile', authenticate.authorize(), ProfileRouter)
    app.use('/user', authenticate.authorize_admin(), UserRouter)
    app.use('/draw', authenticate.authorize_admin(), DrawRouter)
    app.use('/option', authenticate.authorize_admin(), OptionRouter)

    app.use(function (req, res, next) {
        next(createError(404));
    })
    app.use(function (err, req, res, next) {
        res.status(err.statusCode || 500).json({
            error: {
                message: err.message
            }
        })
    })
}