const FeeCategoryModal = require("../../../models/master/fee-category.molels");

const updateFeeCategories = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, description, amount } = req.body;

    const updatedFeeCategory = await FeeCategoryModal.findByIdAndUpdate(
      id,
      { name, description, amount },
      { new: true }
    );

    if (!updatedFeeCategory) {
      return res.status(404).json({ error: "Fee category not found" });
    }

    res.json(updatedFeeCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = updateFeeCategories;
