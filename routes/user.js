const express =require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const post_controller =require('../controllers/post_controller');
const passport=require('passport');
router.get('/profile',passport.checkAuthentication,userController.profile);
router.get('/post',post_controller.post);
router.get('/signIn',userController.signIn);
router.get('/signUp',userController.signUp);
router.post('/create',userController.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/user/signIn'}
),userController.createSession)
module.exports=router;