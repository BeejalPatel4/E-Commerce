
const express =require('express');
const router = express.Router();
const userController =require('../Controller/user');
const {authMiddlwere} =require('../middelware/auth');
router.post('/user',userController.signUp);
router.post('/user/login',userController.login);
router.get('/user',authMiddlwere,userController.userInfo);


module.exports=router;  