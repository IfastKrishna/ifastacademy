const {
  FollowupMode,
} = require("../../../models/master/follow-up-mode.models");
const handleErrors = require("../../../utils/handleErrors");

const updateFollowupMode = async (req, res) => {
  try {
    const { followupMode, _id } = req.body;
    const updatedFollowupMode = await FollowupMode.findByIdAndUpdate(
      followupModeId,
      { followupMode },
      { new: true }
    );
    res.status(200).json({ followupMode: updatedFollowupMode });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = updateFollowupMode;
