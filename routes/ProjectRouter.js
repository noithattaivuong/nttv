const router = require('express').Router();
const Project = require('../controllers/ProjectController');
const authenticate = require('../lib/authenticate')

router.get('/', Project.getList);
router.get('/ma/:ma', Project.get);
router.get('/top/:n', Project.getTop);
router.post('/', authenticate.authorize_admin(), Project.add);
router.put('/ma/:ma', authenticate.authorize_admin(), Project.update);
router.delete('/ma/:ma', authenticate.authorize_admin(), Project.delete);

module.exports = router;