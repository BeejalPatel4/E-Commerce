const express =require('express');
const router = express.Router();
const cartController=require('../Controller/cart');
const {authMiddlwere} =require('../middelware/auth')


router.post('/cart',authMiddlwere,cartController.addToCart);
router.get('/cart',authMiddlwere,cartController.getUserCart);
router.delete('/cart/:productId',authMiddlwere,cartController.romoveCart);
router.put('/cart/:productId',authMiddlwere,cartController.updateCartQuantity)


module.exports=router;