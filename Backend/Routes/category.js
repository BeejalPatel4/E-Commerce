const express =require('express');
const router = express.Router();
const categoryController=require('../Controller/Category');
const {authAdminMiddlwere} =require('../middelware/auth')


router.post('/category',authAdminMiddlwere,categoryController.createCategory);
router.get('/category',categoryController.categoryList);
router.delete('/category/:categoryId',authAdminMiddlwere,categoryController.deleteCategory);



module.exports=router;