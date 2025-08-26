const Product = require("../Model/product");
const fs = require("fs");
const path = require("path");
// const { createProductSchema } = require('../helper/validation');
const { createProductSchema } = require("../helper/validation");

const createProduct = async (req, res) => {
  try {
    const { error } = createProductSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }

    const { name, description, category, quantity, pricePerquantity } =
      req.body;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    let image = req.files.image;
    image.name = Date.now() + "_" + image.name;
    if (!req.files || !req.files.image) {
      return res.status(400).json({ msg: "Image file is required" });
    }

    const uploadDir = path.join(__dirname, "..", "Upload", "product");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const product_logo = `/product/${image.name}`;

    // image.mv(path.join(uploadDir, image.name), funtion(error){
    await image.mv(path.join(uploadDir, image.name), function (error) {
      if (error) {
        console.log("Error on file upLoded", error);
        return res.status(500).json({
          msg: "server error on uploded file",
        });
      }
    });
    const product = await Product.create({
      name,
      description,
      category,
      quantity,
      pricePerquantity,
      image: product_logo,
    });

    return res.status(200).json({
      msg: "Product created successfully.",
      data: { product },
    });
  } catch (error) {
    console.log("category error:", error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again." });
  }
};

const productList = async (req, res) => {
  try {
    const { limit = 10, offset = 1 } = req.query;
    const skip = (offset - 1) * limit;
    const product = await Product.find()
      .populate("category", "name")
      .skip(skip)
      .limit(limit);
    const total = await Product.countDocuments(); //often use that include the specific conditions
    return res.status(200).json({
      msg: "Product List",
      data: {
        product,
        pagination: { limit: limit, offset: offset, total: total },
      },
    });
  } catch (error) {
    console.log("category error:", error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again." });
  }
};

const productDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const productInfo = await Product.findById(id).populate("category");
    if (!productInfo) {
      return res.status(400).json({ msg: "Product not fond." });
    }
    return res
      .status(200)
      .json({ msg: "Product Details", data: { productInfo } });
  } catch (error) {
    console.log("category error:", error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again." });
  }
};




const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productInfo = await Product.findById(id);
    if (!productInfo) {
      return res.status(400).json({ msg: "Product not fond." });
    }

    const { name, description, category, quantity, pricePerquantity } =
      req.body;



    let product_logo = null;


    if (req.files) {
      let image = req.files.image;
      image.name = Date.now() + "_" + image.name;

      const uploadDir = path.join(__dirname, "..", "Upload", "product");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      product_logo = `/product/${image.name}`;

      image.mv(path.join(uploadDir, image.name), function (error) {
        if (error) {
          console.log("Error on file Uploded", error);
          return res.status(500).json({
            msg: "server error on uploded file",
          });
        }
      });
      
      fs.unlink(
        path.join(__dirname, "..", "Upload", productInfo.image),
        function (error) {
          if (error) {
            console.log("Error on updeting file", error);
            return res.status(500).json({
              msg: "server error on uploded file",
            });
          }
        }
      );
    }

    await Product.findByIdAndUpdate(id, {
      name: name || productInfo.name,
      description: description || productInfo.description,
      category: category || productInfo.category,
      quantity: quantity || productInfo.quantity,
      pricePerquantity: pricePerquantity || productInfo.pricePerquantity,
      image: product_logo || productInfo.image,
    });
    return res.status(200).json({ msg: "Product Updated." });
  } catch (error) {
    console.log("category error:", error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again." });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ msg: "Product ID is required." });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: "Product not found." });
    }

    const imageName = product.image?.split("/product/")[1];
    const imagePath = path.join(
      __dirname,
      "..",
      "Upload",
      "product",
      imageName
    );

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await Product.findByIdAndDelete(productId);

    return res.status(200).json({ msg: "Product deleted successfully." });
  } catch (error) {
    console.log("delete product error:", error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again." });
  }
};
module.exports = {
  createProduct,
  productList,
  productDetails,
  editProduct,
  deleteProduct,
};
