const FollowupMode = require("../../../models/master/follow-up-mode.models");
const handleErrors = require("../../../utils/handleErrors");

const updateFollowupMode = async (req, res) => {
  try {
    const { id } = req.params;
    const { followupMode } = req.body;
    const updatedFollowupMode = await FollowupMode.findByIdAndUpdate(
      id,
      { followupMode },
      { new: true }
    );
    res.status(200).json({ success: true, data: updatedFollowupMode });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = updateFollowupMode;
