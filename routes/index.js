const UserRouter = require('./UserRouter')
const DrawRouter = require('./DrawRouter')
const ProfileRouter = require('./ProfileRouter')
const ProductRouter = require('./ProductRouter')
const AccountRouter = require('./AccountRouter')
const ProjectRouter = require('./ProjectRouter')
const createError = require('http-errors')
const authenticate = require('../lib/authenticate')

module.exports = (app) => {
    app.use('/account', AccountRouter)
    app.use('/product', ProductRouter)
    app.use('/project', ProjectRouter)
    app.use('/profile', authenticate.authorize(), ProfileRouter)
    app.use('/user', authenticate.authorize_admin(), UserRouter)
    app.use('/draw', authenticate.authorize_admin(), DrawRouter)
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