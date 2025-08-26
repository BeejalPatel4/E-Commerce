const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 0,
        },
        price: {
          type: Number,
          default:0,
        },
      },
    ],

    totalAmount: Number,
    paymentType: {
      type: String,
      enum: ["COD", "ONLINE"],
      default: "COD",
    },

    firstName: {
      type: String,
      require: true,
      maxlenght: 50,
      trim: true,
    },
    secondName: {
      type: String,
      maxlenght: 50,
      default: null,
    },
    address: {
      type: String,
      require: true,
    },
    address2: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      require: true,
    },
    state: {
      type: String,
      require: true,
    },
    zip: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      enum:['initiated','pending','processing','completed','cencel'],
      default:'initiated',
      
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Order", OrderSchema);
