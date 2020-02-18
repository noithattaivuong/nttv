const router = require('express').Router();
const Category = require('../controllers/CategoryController');
const authenticate = require('../lib/authenticate')

router.get('/', Category.getList);
router.get('/id/:id', Category.get);
router.post('/', authenticate.authorize_admin(), Category.add);
router.put('/id/:id', authenticate.authorize_admin(), Category.update);
router.delete('/id/:id', authenticate.authorize_admin(), Category.delete);

module.exports = router;