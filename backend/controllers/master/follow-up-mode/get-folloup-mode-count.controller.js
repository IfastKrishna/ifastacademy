const FollowupMode = require("../../../models/master/follow-up-mode.models");
const handleErrors = require("../../../utils/handleErrors");

const getFollowupModesCount = async (req, res) => {
  try {
    const count = await FollowupMode.countDocuments({});
    res.status(200).json({ count });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = getFollowupModesCount;
