const router = require('express').Router();
const Draw = require('../controllers/DrawController');

// check authenticate in route
router.get('/', Draw.getList);
router.get('/name/:name', Draw.getOne);
router.get('/id/:id', Draw.get);
router.post('/', Draw.add);
router.put('/id/:id', Draw.update);
router.delete('/id/:id', Draw.delete);

module.exports = router;