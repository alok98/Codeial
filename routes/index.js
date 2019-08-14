const express=require('express');
const router=express.Router();
const homeController=require('../controllers/homeController');
const user=require('./user');
router.get('/',homeController.home);
router.use('/user',require('./user'));
console.log('router loaded');
module.exports =  router;