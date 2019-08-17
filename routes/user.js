const express =require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const post_controller =require('../controllers/post_controller');
router.get('/profile',userController.profile);
router.get('/post',post_controller.post);
router.get('/signIn',userController.signIn);
router.get('/signUp',userController.signUp);

module.exports=router;