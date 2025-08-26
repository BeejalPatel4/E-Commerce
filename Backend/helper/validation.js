const Joi = require('joi');


const signUpSchema =Joi.object()
.keys({
    name:Joi.string()
    .min(3)
    .max(40)
    .required(),
    email:Joi.string()
    .min(3)
    .max(50)
    .required(),
    password:Joi.string()
    .min(3)
    .max(12)
    .required()
})


const loginSchema =Joi.object()
.keys({
   
     email:Joi.string()
    .min(3)
    .max(50)
    .required(),
    password:Joi.string()
    .min(3)
    .max(12)
    .required()
})

const createCategorySchema =Joi.object()
.keys({
   
     name:Joi.string()
    .min(3)
    .max(50)
    .required(),
    
})


const createProductSchema =Joi.object()
.keys({
    name:Joi.string()
    .min(3)
    .max(40)
    .required(),
    description:Joi.string()
    .min(3)
    .max(1000)
    .required(),
    category:Joi.string()
    .required(),
    quantity:Joi.number()
    .min(1)
    .required(),
    pricePerquantity:Joi.number()
    .min(1)
    .required(),
})


const initiateCheckeoutSchema =Joi.object()
.keys({
    paymentType:Joi.string()
    .min(3)
    .max(40)
    .required(),
    firstName:Joi.string()
    .min(3)
    .max(50)
    .required(),
    secondName:Joi.string()
    .min(3)
    .max(50)
    .required(),
    address:Joi.string()
       .required(),
    address2:Joi.string() 
    .allow(" ")
    .optional(),
    city:Joi.string()
    .min(1)
    .required(),
    state:Joi.string()
    .min(1)
    .required(),
   zip:Joi.string()
    .min(1)
    .required(),
})

const contactSchema=Joi.object()
.keys({
    name:Joi.string()
    .min(3)
    .max(40)
    .required(),
   email:Joi.string()
    .min(3)
    .max(50)
    .required(),
    message:Joi.string()
    .min(3)
    .max(1000)
    .required(),

})


const updatedOrderStatusSchema =Joi.object()
.keys({
   
     status:Joi.string()
    .min(3)
    .max(50)
    .required(),
    
})

module.exports={
    signUpSchema,
    loginSchema,
    createCategorySchema,
    createProductSchema,
    initiateCheckeoutSchema,
    contactSchema,
    updatedOrderStatusSchema
}