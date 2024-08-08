const FeeCategoryModal = require("../../../models/master/fee-category.molels");

const addFeeCategories = async (req, res) => {
  try {
    const { name, description, amount } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const existingFeeCategory = await FeeCategoryModal.findOne({ name });
    if (existingFeeCategory)
      return res.status(400).json({ message: "Fee category already exists" });

    const feeCategories = await FeeCategoryModal.create({
      name,
      description,
      amount,
    });

    res.status(201).json({
      success: true,
      message: "Fee Categories added successfully",
      data: feeCategories,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = addFeeCategories;
