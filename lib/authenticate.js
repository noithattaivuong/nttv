const expressJwt = require('express-jwt');
const config = require("../lib/config");
module.exports = {
    authorize(roles = []) {
        // roles param can be a single role string (e.g. Role.User or 'User') 
        // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
        if (roles == null) {
            roles = [];
        }
        if (typeof roles === 'string') {
            roles = [roles];
        }
        return [
            // authenticate JWT token and attach user to request object (req.user)
            expressJwt({ secret: config.token_generator.secret_key }),
            (req, res, next) => {
                console.log('has request: ' + req.originalUrl + ' user-role: ' + req.user.role + ' in role:' + roles)
                if (!req.user || !req.user.role || !req.user.username) {
                    return res.status(401).json({
                        error: {
                            message: 'Unauthorized'
                        }
                    })
                }
                // no check authentication
                if (req.user.role != 'admin') {
                    if (roles.length && !roles.includes(req.user.role)) {
                        // user's role is not authorized
                        return res.status(401).json({
                            error: {
                                message: 'Unauthorized'
                            }
                        })
                    }
                }

                // authentication and authorization successful
                next();
            }
        ];
    },
    authorize_admin() {
        return [
            // authenticate JWT token and attach user to request object (req.user)
            expressJwt({ secret: config.token_generator.secret_key,credentialsRequired: false }),
            (req, res, next) => {
                console.log('heelo worjd');
                if(!config.token_generator.credentialsRequired){
                    console.log('has request: ' + req.originalUrl + ' not-author: ')
                    return next();
                }
                console.log('has request: ' + req.originalUrl + ' role: ' + req.user.role)
                if (!req.user || !req.user.role || !req.user.username) {
                    return res.status(401).json({
                        error: {
                            message: 'Unauthorized'
                        }
                    })
                }

                // no check authentication
                if (req.user.role != 'admin') {
                    // user's role is not authorized
                    return res.status(401).json({
                        error: {
                            message: 'Unauthorized'
                        }
                    })
                }

                // authentication and authorization successful
                next();
            }
        ];
    }
}
