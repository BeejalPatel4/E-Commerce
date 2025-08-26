
const Cart = require('../Model/Cart');
const Product = require('../Model/product');



const addToCart = async (req, res) => {
    try {

            if (req.user.role === 1) {
              return res.status(403).json({ msg: "Admins are not allowed to add items to cart." });
    }
        const userId = req.user._id
        console.log(req.user);
        const { productId, quantity } = req.body;
        const productInfo = await Product.findById(productId);

        if (!productInfo) {
            return res.status(400).json({ msg: "Product not fond." });

        }
        const pricePerquantity = productInfo.pricePerquantity;

        const price = quantity * pricePerquantity


        let cart = await Cart.findOne({ user: userId })

        if (!cart) {
            cart = new Cart({
                user: userId,
                products: [],
                totalAmount: 0
            })
        }
        const productExistIndex = cart.products.findIndex(item => item.product.equals(productId))
        if (productExistIndex > -1) {
         
            cart.products[productExistIndex].quantity += quantity;
            cart.products[productExistIndex].price = cart.products[productExistIndex].quantity * pricePerquantity;



        }
        else {
            cart.products.push({ product: productId, quantity, price })

        }
        const totalAmount = cart.products.reduce((total, item) => total + item.price, 0)

        cart.totalAmount = totalAmount;
        const cartInfo = await cart.save();
        return res.status(200).json({ msg: "Add to cart Successfull", data: { cartInfo } });


    } catch (error) {
        console.log(" Product Can't Add in Cart:", error);
        return res.status(500).json({ msg: "Something went wrong, please try again." });
    }
}


const getUserCart = async (req, res) => {
    try {
        const userId = req.user._id


        const cart = await Cart.findOne({ user: userId }).populate('products.product');
        return res.status(200).json({ msg: "My Cart.", data: { cart } });

    }
    catch (error) {
        console.log("  Can't  get prodsuct detatils in Cart:", error);
        return res.status(500).json({ msg: "Something went wrong, please try again." });
    }
}

const romoveCart = async (req, res) => {
    try {
        const userId = req.user._id
        const { productId } = req.params
        const cartInfo = await Cart.findOne({ user: userId });
        if (!cartInfo) {
            return res.status(400).json({
                msg: "Cart not fond"
            })
        }


        const price = cartInfo.products.find(item => item.product == productId).price;
        //         const productItem = cartInfo.products.find(item => item.product.equals(productId));
        // const price = productItem?.price || 0;


        // const cart = await Cart.findByIdAndUpdate(
        //     { user: userId },
        //     {
        //         $pull: { products: { product: productId } }
        //     },
        //     {
        //         $inc: { totalAmount: -price }
        //     }
        // )

        const cart = await Cart.findOneAndUpdate(
            { user: userId },
            {
                $pull: { products: { product: productId } },
                $inc: { totalAmount: -price }
            },
            { new: true }
        );

        return res.status(200).json({ msg: "Cart Remove.", data: { cart } });

    }
    catch (error) {
        console.log(" Product cant't remove in to Cart:", error);
        return res.status(500).json({ msg: "Something went wrong, please try again." });
    }
}

const updateCartQuantity = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;
    const { change } = req.body;

    const cart = await Cart.findOne({ user: userId });
    const item = cart.products.find(i => i.product.equals(productId));
    const productInfo = await Product.findById(productId);

    if (!item || !productInfo) {
      return res.status(404).json({ msg: "Item not found in cart" });
    }

    item.quantity += change;

    if (item.quantity <= 0) {
      cart.products = cart.products.filter(i => !i.product.equals(productId));
    } else {
      item.price = item.quantity * productInfo.pricePerquantity;
    }

    cart.totalAmount = cart.products.reduce((acc, item) => acc + item.price, 0);
    await cart.save();

    return res.status(200).json({ msg: "Cart updated", data: { cart } });
  } catch (error) {
    console.log("Error updating cart:", error);
    return res.status(500).json({ msg: "Something went wrong, please try again." });
  }
};



module.exports = { addToCart, getUserCart, romoveCart,updateCartQuantity };
