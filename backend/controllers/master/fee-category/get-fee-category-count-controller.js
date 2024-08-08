const FeeCategoryModal = require("../../../models/master/fee-category.molels");
const handleErrors = require("../../../utils/handleErrors");

const getFeeCategoriesCount = async (req, res) => {
  try {
    const count = await FeeCategoryModal.countDocuments({});
    res.status(200).json({ count });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = getFeeCategoriesCount;
