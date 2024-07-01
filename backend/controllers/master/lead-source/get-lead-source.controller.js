const { LeadSource } = require("../../../models/master/lead-source.models");
const handleErrors = require("../../../utils/handleErrors");

const getLeadSource = async (req, res) => {
  try {
    const { pageSize = 10, currentPage = 1 } = req.query;

    const pageSizeInt = parseInt(pageSize, 10);
    const currentPageInt = parseInt(currentPage, 10);

    const [leadSources, totalCount] = await Promise.all([
      LeadSource.aggregate([
        { $sort: { createdAt: -1 } },
        { $skip: pageSizeInt * currentPageInt },
        { $limit: pageSizeInt },
      ]),
      LeadSource.countDocuments(),
    ]);

    res.status(200).json({
      data: leadSources,
      totalCount,
      message: "Lead Source fetched successfully",
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = getLeadSource;
