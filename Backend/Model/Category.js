const mongoose = require("mongoose");

const createCategorySchema = new mongoose.Schema(
  {
    
    name: { type: String, required: true, maxlenght: 50, trim: true },
    logo: { type: String, trim: true, default: null }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", createCategorySchema);
