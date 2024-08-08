const FollowupMode = require("../../../models/master/follow-up-mode.models");
const handleErrors = require("../../../utils/handleErrors");

const getFollowupModeById = async (req, res) => {
  try {
    const { id } = req.params;
    const followupMode = await FollowupMode.findById(id);
    if (!followupMode) {
      return res
        .status(404)
        .json({ message: `Followup Mode with id ${id} not found` });
    }
    res.status(200).json({
      data: followupMode,
      message: "Followup Mode fetched successfully",
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = getFollowupModeById;
