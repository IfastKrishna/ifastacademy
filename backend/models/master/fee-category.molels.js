const mongoose = require("mongoose");

const feeCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  description: {
    type: String,
    required: false,
  },

  amount: {
    type: Number,
    required: false,
  },
});

const FeeCategoryModal = mongoose.model("FeeCategory", feeCategorySchema);

module.exports = FeeCategoryModal;
