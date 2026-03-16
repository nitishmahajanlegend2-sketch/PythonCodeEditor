//import { Router } from 'express';
const express=require('express');
const { loginController, registerController } = require('../controllers/userController');
//router object
const router=express.Router();
//routers
router.post('/login',loginController);
//console.log('reached router')
router.post('/register',registerController)
module.exports = router;
