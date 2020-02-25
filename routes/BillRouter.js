const router = require('express').Router();
const Bill = require('../controllers/BillController');
const authenticate = require('../lib/authenticate')

router.get('/', Bill.getList);
router.get('/id/:id', Bill.get);
router.post('/', authenticate.authorize_admin(), Bill.add);
router.put('/id/:id', authenticate.authorize_admin(), Bill.update);
router.delete('/id/:id', authenticate.authorize_admin(), Bill.delete);

module.exports = router;