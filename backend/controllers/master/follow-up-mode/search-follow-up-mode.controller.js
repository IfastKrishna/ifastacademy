const {
  FollowupMode,
} = require("../../../models/master/follow-up-mode.models");
const handleErrors = require("../../../utils/handleErrors");

const searchFollowUpMode = async (req, res) => {
  try {
    const { search = "", pageSize = 10, currentPage = 1 } = req.query;

    const regex = new RegExp(search, "i");
    const skip = (parseInt(currentPage, 10) - 1) * parseInt(pageSize, 10);
    const limit = parseInt(pageSize, 10);

    const pipeline = [
      {
        $match: {
          followupMode: { $regex: regex },
        },
      },
      {
        $facet: {
          data: [
            { $project: { followupMode: 1 } },
            { $sort: { followupMode: 1 } },
            { $skip: skip },
            { $limit: limit },
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

    const result = await FollowupMode.aggregate(pipeline);
    const { data, totalCount } = result[0];

    return res.status(200).json({
      data,
      totalCount: totalCount || 0,
      message: "Followup Mode fetched successfully",
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = searchFollowUpMode;
