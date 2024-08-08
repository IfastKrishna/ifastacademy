const FollowupMode = require("../../../models/master/follow-up-mode.models");
const handleErrors = require("../../../utils/handleErrors");

const getFollowupModes = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, search = "" } = req.query;

    const currentPageInt = parseInt(page, 10);
    const pageSizeInt = parseInt(pageSize, 10);
    const regex = new RegExp(search, "i");

    const [followupMode, totalCount] = await Promise.all([
      FollowupMode.aggregate([
        { $match: { followupMode: regex } },
        { $sort: { createdAt: -1 } },
        { $skip: (currentPageInt - 1) * pageSizeInt },
        { $limit: pageSizeInt },
      ]),
      FollowupMode.countDocuments({ followupMode: regex }),
    ]);

    res.status(200).json({
      data: followupMode,
      count: totalCount,
      message: "Followup Mode fetched successfully",
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = getFollowupModes;
