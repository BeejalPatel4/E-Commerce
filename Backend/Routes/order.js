const express =require('express');
const router = express.Router();
const orderController=require('../Controller/Order');
const {authAdminMiddlwere} =require('../middelware/auth')

const {authMiddlwere} =require('../middelware/auth')

router.get('/order',authAdminMiddlwere,orderController.allOrders);

router.get('/order=user',authMiddlwere,orderController.userOrder);

router.get('/order/:orderId',authAdminMiddlwere,orderController.getOrderId);
// router.patch("/order/:orderId",authAdminMiddlwere,orderController.confirmOrderReceived);
router.put('/order/:orderId',authAdminMiddlwere,orderController.updatedOrder);

module.exports=router;