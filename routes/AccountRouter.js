const router = require('express').Router();
const Account = require('../controllers/AccountController');

router.post('/login', Account.login);
router.post('/admin/login', Account.login_admin);
router.post('/register', Account.register);
router.post('/admin/register', Account.register_admin);


module.exports = router;