const FeeCategoryModal = require("../../../models/master/fee-category.molels");

const deleteFeeCategories = async (req, res) => {
  try {
    let { id } = req.params;
    let feeCategories;
    if (Array.isArray(JSON.parse(id))) {
      feeCategories = await FeeCategoryModal.deleteMany({
        _id: { $in: JSON.parse(id) },
      });
    } else {
      feeCategories = await FeeCategoryModal.findByIdAndDelete(id);
    }
    if (!feeCategories) {
      return res.status(404).json({
        success: false,
        message: "Fee Category not found",
      });
    }
    res.status(201).json({
      success: true,
      message: "Fee Category(s) deleted successfully",
      data: feeCategories,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = deleteFeeCategories;
