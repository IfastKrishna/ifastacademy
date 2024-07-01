const { LeadSource } = require("../../../models/master/lead-source.models");
const handleErrors = require("../../../utils/handleErrors");

const searchLeadSource = async (req, res) => {
  try {
    const { name, dateRange, currentPage = 1, pageSize = 10 } = req.query;

    const currentPageInt = parseInt(currentPage, 10);
    const pageSizeInt = parseInt(pageSize, 10);

    // Ensure dateRange is defined and has valid start and end
    const matchStage = {
      name: { $regex: name, $options: "i" },
    };

    if (dateRange && dateRange.start && dateRange.end) {
      matchStage.createAt = {
        $gte: new Date(dateRange.start),
        $lte: new Date(dateRange.end),
      };
    }

    const pipeline = [
      { $match: matchStage },
      {
        $facet: {
          data: [
            { $skip: (currentPageInt - 1) * pageSizeInt },
            { $limit: pageSizeInt },
          ],
          totalCount: [{ $count: "count" }],
        },
      },
      {
        $project: {
          data: 1,
          totalCount: { $arrayElemAt: ["$totalCount.count", 0] },
        },
      },
    ];

    const leadSource = await LeadSource.aggregate(pipeline);
    const result = leadSource[0] || { data: [], totalCount: 0 };

    res.status(200).json({
      data: result.data,
      totalCount: result.totalCount,
      message: "Lead Source fetched successfully",
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = searchLeadSource;
