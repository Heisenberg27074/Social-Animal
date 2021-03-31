const express =  require("express");
const router  = express.Router();
const usersController =  require('../controllers/users_controllers');

router.get('/profile',usersController.profile);

router.get('/friends',usersController.friends);
module.exports = router;