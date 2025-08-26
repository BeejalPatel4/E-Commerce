
const Category = require('../Model/Category');
// const Product = require('../Model/Product'); 


const fs = require('fs');
const path = require('path');
const { createCategorySchema } = require('../helper/validation');

const createCategory = async (req, res) => {
  try {
    const { error } = createCategorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const { name } = req.body;
    let image = req.files.image;
    // imageName = Date.now() + "_" + image.name;
    const imageName = Date.now() + "_" + image.name;



    const uploadDir = path.join(__dirname, '..', 'Upload', 'category');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // const category_logo = `${process.env.BASE_URL}/category/${image.name}`;
    // await image.mv(path.join(uploadDir, image.name));
await image.mv(path.join(uploadDir, imageName));
const category_logo = `${process.env.BASE_URL}/category/${imageName}`;
    const category = await Category.create({
      name: name,
      logo: category_logo
    });

    return res.status(201).json({
      msg: "Category created successfully.",
      data: { category }
     
    });
  
  } catch (error) {
    console.log("category error:", error);
    return res.status(500).json({ msg: "Something went wrong, please try again." });
  }
 
  
};


const categoryList =async(req,res) =>{
  try{
     const {limit=10,offset=1} =req.query;//offset ==page number,limit=number of recoredof data 
     const skip=(offset - 1 ) * limit;
     const categories=await Category.find().skip(skip).limit(limit);

const total =await Category.countDocuments();//often use that include the specific conditions

         return res.status(200).json({ msg: "Caregory List",data:{categories,pagination:{limit:limit,offset:offset,total:total}} });



  }catch(error){
        console.log("category error:", error);
    return res.status(500).json({ msg: "Something went wrong, please try again." });  
  }
}

const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({ msg: "Category ID is required." });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ msg: "Category not found." });
    }

    // Extract image filename from logo URL
    const imageName = category.logo?.split('/category/')[1];
    const imagePath = path.join(__dirname, '..', 'Upload', 'category', imageName);

    // Delete image
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await Category.findByIdAndDelete(categoryId);

    return res.status(200).json({ msg: "Category deleted successfully." });
  } catch (error) {
    console.log("delete category error:", error);
    return res.status(500).json({ msg: "Something went wrong, please try again." });
  }
};








module.exports = { createCategory,categoryList,deleteCategory};
