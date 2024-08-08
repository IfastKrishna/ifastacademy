const LeadSourceModal = require("../../../models/master/lead-source.models");
const handleErrors = require("../../../utils/handleErrors");

const getLeadSources = async (req, res) => {
  try {
    const { pageSize = 10, currentPage = 1, search = "" } = req.query;

    const pageSizeInt = parseInt(pageSize, 10);
    const currentPageInt = parseInt(currentPage, 10) - 1; // Subtract 1 to handle zero-based pagination

    const regex = new RegExp(search, "i");
    const query = {
      $or: [{ name: regex }, { description: regex }, { contact: regex }],
    };

    const [leadSources, totalCount] = await Promise.all([
      LeadSourceModal.aggregate([
        { $match: query },
        { $sort: { createdAt: -1 } },
        { $skip: pageSizeInt * currentPageInt },
        { $limit: pageSizeInt },
      ]),
      LeadSourceModal.countDocuments(query),
    ]);

    res.status(200).json({
      data: leadSources,
      count: totalCount,
      message: "Lead Sources fetched successfully",
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = getLeadSources;
