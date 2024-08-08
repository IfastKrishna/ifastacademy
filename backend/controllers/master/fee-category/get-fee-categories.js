const FeeCategoryModal = require("../../../models/master/fee-category.molels");
const handleErrors = require("../../../utils/handleErrors");

const getFeeCategories = async (req, res) => {
  try {
    const { pageSize = 10, page = 1, search = "" } = req.query;

    const pageSizeInt = parseInt(pageSize, 10);
    const currentPageInt = parseInt(page, 10) - 1; // Subtract 1 to handle zero-based pagination

    const regex = new RegExp(search, "i");
    const query = {
      $or: [{ name: regex }, { description: regex }, { amount: search }],
    };

    const [data, totalCount] = await Promise.all([
      FeeCategoryModal.aggregate([
        { $match: query },
        { $sort: { createdAt: -1 } },
        { $skip: pageSizeInt * currentPageInt },
        { $limit: pageSizeInt },
      ]),
      FeeCategoryModal.countDocuments(query), // Corrected to use FeeCategoryModal
    ]);

    res.status(200).json({
      data: data,
      count: totalCount,
      message: "Fee Categories fetched successfully",
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = getFeeCategories;
