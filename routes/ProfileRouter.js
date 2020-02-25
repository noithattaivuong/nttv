const router = require('express').Router();
const Profile = require('../controllers/ProfileController');

router.get('/', Profile.getProfile);
router.put('/', Profile.updateProfile);
router.put('/change', Profile.changePassword);
router.get('/draw', Profile.getDraw);
router.get('/draw/name/:name', Profile.getDrawByName);
router.get('/draw/id/:id', Profile.getDrawByMa);
router.post('/draw/', Profile.addDraw);
router.put('/draw/id/:id', Profile.updateDraw);
router.get('/bill/', Profile.getListBill);
router.get('/bill/id/:id', Profile.getBill);


module.exports = router;