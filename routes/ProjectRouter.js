const router = require('express').Router();
const Project = require('../controllers/ProjectController');
const authenticate = require('../lib/authenticate')

router.get('/', Project.getList);
router.get('/id/:id', Project.get);
router.get('/top/:n', Project.getTop);
router.post('/', authenticate.authorize_admin(), Project.add);
router.put('/id/:id', authenticate.authorize_admin(), Project.update);
router.delete('/id/:id', authenticate.authorize_admin(), Project.delete);

module.exports = router;