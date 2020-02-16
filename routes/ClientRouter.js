const router = require('express').Router();
const Client = require('../controllers/ClientController');

// check authenticate in route
router.get('/home', Client.getHome);

module.exports = router;