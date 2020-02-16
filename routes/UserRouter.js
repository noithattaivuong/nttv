const router = require('express').Router();
const User = require('../controllers/UserController');


// check authenticate in route
router.get('/', User.getList);
router.get('/username/:username', User.getByUsername);


module.exports = router;