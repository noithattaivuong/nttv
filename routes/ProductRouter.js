const router = require('express').Router();
const Product = require('../controllers/ProductController');
const authenticate = require('../lib/authenticate')

router.get('/', Product.getList);
router.get('/ma/:ma', Product.get);
router.post('/', authenticate.authorize_admin(), Product.add);
router.put('/ma/:ma', authenticate.authorize_admin(), Product.update);
router.delete('/ma/:ma', authenticate.authorize_admin(), Product.delete);

module.exports = router;