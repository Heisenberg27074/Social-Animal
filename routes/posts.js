const express = require('express');
const router = express.Router();
const passport =  require('passport');

const postsController = require('../controllers/posts_controller');

router.post('/create', passport.checkAuthentication ,postsController.create);
router.get('/destroy/:id', passport.checkAuthentication, postsController.destroy);
// TO DO LATER ====> ADD A ROUTE TO LET AUTHOR DELETE COMMENTS ON HIS POST
// router.get('/hide/:id', passport.checkAuthentication, postsController.hide);

module.exports = router;