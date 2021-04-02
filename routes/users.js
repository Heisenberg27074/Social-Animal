const express =  require("express");
const router  = express.Router();
const usersController =  require('../controllers/users_controllers');

router.get('/sign-up',usersController.signUp);

router.get('/sign-in',usersController.signIn);
router.post('/create', usersController.create);
router.get('/create-session',usersController.createSession);
module.exports = router;