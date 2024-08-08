const FeeCategoryModal = require("../../../models/master/fee-category.molels");

const getFeeCategoriesById = async (req, res) => {
  try {
    const { id } = req.params;
    const feeCategories = await FeeCategoryModal.findById(id);
    if (!feeCategories) {
      return res.status(404).json({
        success: false,
        message: "Fee Category not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Fee Category fetched successfully",
      data: feeCategories,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = getFeeCategoriesById;
