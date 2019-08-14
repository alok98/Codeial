const express=require('express');
const routes=express.Router();
const homeController=require('../controllers/homeController');
routes.get('/',homeController.home);
console.log('router loaded');
module.exports =  routes;