const express =require('express');
const router = express.Router();
const checkeoutController=require('../Controller/checkeout');
const {authMiddlwere} =require('../middelware/auth')


router.post('/checkout',authMiddlwere,checkeoutController.initiateCheckeout);

router.put('/checkout/:orderId',authMiddlwere,checkeoutController.conformCheckeout);


module.exports=router;