const router = require('express').Router();
const Product = require('../controllers/ProductController');
const authenticate = require('../lib/authenticate')

router.get('/', Product.getList);
router.get('/category/:categoryId', Product.getListByCategory);
router.get('/search', Product.getListBySearch);
router.get('/id/:id', Product.get);
router.post('/', authenticate.authorize_admin(), Product.add);
router.put('/id/:id', authenticate.authorize_admin(), Product.update);
router.delete('/id/:id', authenticate.authorize_admin(), Product.delete);

module.exports = router;