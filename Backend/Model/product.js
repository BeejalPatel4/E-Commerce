const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxlenght: 50, trim: true },
    description: { type: String, required: true, maxlenght: 1000, trim: true },
    image: { type: String, trim: true, default: null },
    category: { type: mongoose.Types.ObjectId, ref: "Category" },
    quantity: { type: Number, default: 0 },
    pricePerquantity: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
