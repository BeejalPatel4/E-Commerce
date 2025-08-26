const { required } = require('joi');
const Order = require('../Model/Order');
const Product = require('../Model/product');
const { updatedOrderStatusSchema } = require('../helper/validation')

const allOrders = async (req, res) => {
    try {
        const { limit = 20, offset = 1 } = req.query;
        const skip = (offset - 1) * limit;
        const orders = await Order.find().populate('user', 'name email ').populate('products.product', 'name image').skip(skip).limit(limit).sort({ createAt: -1 });
        const total = await Order.countDocuments();

        return res.status(200).json({ msg: "all Order List", data: { orders, pagination: { limit: limit, offset: offset, total: total } } });


    } catch (error) {
        console.log("all Order  page can't fond :", error);
        return res
            .status(500)
            .json({ msg: "Something went wrong, please try again." });
    }
}


const userOrder = async (req, res) => {
    try {

        const userId = req.user._id;
        const { limit = 10, offset = 1 } = req.query;
        const skip = (offset - 1) * limit;
        const orders = await Order.find({ user: userId }).populate('products.product').skip(skip).limit(limit).sort({ createAt: -1 });
        const total = await Order.countDocuments();

        return res.status(200).json({ msg: "all Order List", data: { orders, pagination: { limit: limit, offset: offset, total: total } } });

    }
    catch (error) {
        console.log("All Order page can't fond :", error);
        return res
            .status(500)
            .json({ msg: "Something went wrong, please try again." });
    }
}


const getOrderId = async (req, res) => {
    try {
        const { orderId } = req.params;
        const orderInfo = await Order.findById(orderId).populate('user', 'name email').populate('products.product', 'name image')

        return res.status(200).json({
            msg: "Order Info",
            data: { orderInfo }
        })
    } catch (error) {
        console.error("cant get Order Id:", error);
        return res.status(500).json({ msg: "Something went wrong, please try again." });
    }
}



const updatedOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const orderInfo = await Order.findById(orderId)

        if (!orderInfo) {
            return res.status(404).json({
                msg: "Order not found .",
            });
        }

        const { error } = updatedOrderStatusSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ msg: error.details[0].message });
        }
        const { status } = req.body;
        await Order.findByIdAndUpdate(
            orderId, { status }
        )
        return res.status(200).json({
            msg: "Order is Update.",
          
        });

    } catch (error) {
        console.error("Cant UPDate the Order Status:", error);
        return res.status(500).json({ msg: "Something went wrong, please try again." });
    }
}

module.exports = { allOrders, userOrder, getOrderId, updatedOrder }