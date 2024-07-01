const {
  FollowupMode,
} = require("../../../models/master/follow-up-mode.models");
const handleErrors = require("../../../utils/handleErrors");

const getFollowupMode = async (req, res) => {
  try {
    const { currentPage = 1, pageSize = 10 } = req.query;

    const currentPageInt = parseInt(currentPage, 10);
    const pageSizeInt = parseInt(pageSize, 10);

    const [followupMode, totalCount] = await Promise.all([
      FollowupMode.aggregate([
        { $sort: { createdAt: -1 } },
        { $skip: (currentPageInt - 1) * pageSizeInt },
        { $limit: pageSizeInt },
      ]),
      FollowupMode.countDocuments(),
    ]);

    res.status(200).json({
      data: followupMode,
      totalCount,
      message: "Followup Mode fetched successfully",
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = getFollowupMode;
