const express =require('express');
const router = express.Router();
const productController=require('../Controller/product');
const {authAdminMiddlwere} =require('../middelware/auth')


router.post('/product',authAdminMiddlwere,productController.createProduct);
router.get('/product',productController.productList);
router.get('/product/:id',productController.productDetails);
router.put('/product/:id',productController.editProduct);
router.delete('/product/:productId',productController.deleteProduct);




module.exports=router;