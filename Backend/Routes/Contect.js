const express =require('express');
const router = express.Router();
const ContactController=require('../Controller/Contect');
// const {authMiddlwere} =require('../middelware/auth')


router.post('/contect',ContactController.submitContactForm);






module.exports=router;


