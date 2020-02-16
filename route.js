const UserRouter = require('./routes/UserRouter')
const DrawRouter = require('./routes/DrawRouter')
const ProfileRouter = require('./routes/ProfileRouter')
const ProductRouter = require('./routes/ProductRouter')
const AccountRouter = require('./routes/AccountRouter')
const ProjectRouter = require('./routes/ProjectRouter')
const createError = require('http-errors')
const authenticate = require('./lib/authenticate')

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