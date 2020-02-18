const router = require('express').Router();
const Option = require('../controllers/OptionController');
const authenticate = require('../lib/authenticate')

router.get('/', Option.getList);
router.get('/ma/:ma', Option.get);
router.get('/key/:key', Option.get);
router.post('/', authenticate.authorize_admin(), Option.add);
router.put('/ma/:ma', authenticate.authorize_admin(), Option.update);
router.put('/key/:key', authenticate.authorize_admin(), Option.update);
router.delete('/ma/:ma', authenticate.authorize_admin(), Option.delete);

module.exports = router;