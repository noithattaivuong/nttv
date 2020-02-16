const router = require('express').Router();
const Draw = require('../controllers/DrawController');

// check authenticate in route
router.get('/', Draw.getList);
router.get('/name/:name', Draw.getOne);
router.get('/ma/:ma', Draw.get);
router.post('/', Draw.add);
router.put('/ma/:ma', Draw.update);
router.delete('/ma/:ma', Draw.delete);

module.exports = router;