const {
  FollowupMode,
} = require("../../../models/master/follow-up-mode.models");
const handleErrors = require("../../../utils/handleErrors");

const addFollowupBulk = async (req, res) => {
  try {
    const { followupMode } = req.followupArray;
    const followupModes = await FollowupMode.insertMany(followupMode);
    res.status(201).json(followupModes);
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = addFollowupBulk;
