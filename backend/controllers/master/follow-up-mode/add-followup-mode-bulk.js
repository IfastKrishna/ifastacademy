const {
  FollowupMode,
} = require("../../../models/master/follow-up-mode.models");

const addFollowupBulk = async (req, res) => {
  try {
    const { followupMode } = req.followupArray;
    const followupModes = await FollowupMode.insertMany(followupMode);
    res.status(201).json(followupModes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = addFollowupBulk;
