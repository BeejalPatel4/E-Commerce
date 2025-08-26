const Order = require("../Model/Order");
const Cart = require("../Model/Cart");
const { initiateCheckeoutSchema } = require("../helper/validation");

const initiateCheckeout = async (req, res) => {
  try {
    const { error } = initiateCheckeoutSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    const userId = req.user._id;
    const cartInfo = await Cart.findOne({ user: userId });

    if (!cartInfo) {
      return res
        .status(400)
        .json({ msg: "Sorry,In cart you dont have any Product ." });
    }
    const products = cartInfo.products;
    const totalAmount = cartInfo.totalAmount;

    const {
      paymentType,
      firstName,
      secondName,
      address,
      address2,
      city,
      state,
      zip,
    } = req.body;

    const order = await Order.create({
      user: userId,
      products,
      paymentType,
      totalAmount,
      firstName,
      secondName,
      address,
      address2,
      city,
      state,
      zip,
    });
    return res
      .status(200)
      .json({ msg: "order initiate", data: { orderId: order._id } });
  } catch (error) {
    console.log("Checkeout page can't fond :", error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again." });
  }
};

const conformCheckeout = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { orderId } = req.params;

    const orderInfo = await Order.findOne({
      _id: orderId,
      user: userId,
      status: "initiated",
    });

    if (!orderInfo) {
      return res.status(400).json({
        msg: "Order not fonud.",
      });
    }

    const cartInfo = await Cart.findOne({ user: userId });
    if (!cartInfo) {
      return res.status(400).json({ msg: "Not Product on Cart." });
    }

    await Order.findOneAndUpdate(
      { _id: orderId },
      {
        status: "pending",
      }
    );

    await Cart.findOneAndDelete({ user: userId });

    return res.status(200).json({ msg: "Order conform." });
  } catch (error) {
    console.log(" Oder page cant't fond:", error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again." });
  }
};

module.exports = { initiateCheckeout, conformCheckeout };
