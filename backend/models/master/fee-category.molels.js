const mongoose = require("mongoose");

const feeCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
});

const FeeCategory = mongoose.model("FeeCategory", feeCategorySchema);

module.exports = FeeCategory;
