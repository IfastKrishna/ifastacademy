const {
  FollowupMode,
} = require("../../../models/master/follow-up-mode.models");
const handleErrors = require("../../../utils/handleErrors");

const deleteFollowupMode = async (req, res) => {
  try {
    let { id } = req.params;
    // Parse id if it's a stringified JSON
    id = JSON.parse(id);

    if (Array.isArray(id)) {
      // Deleting multiple followup modes
      const followupMode = await FollowupMode.deleteMany({ _id: { $in: id } });
      if (!followupMode.deletedCount) {
        return res
          .status(404)
          .json({ message: `Followup Mode with ids ${id} not found` });
      }
      return res.json({
        message: `Followup Modes with ids ${id} deleted successfully`,
      });
    } else {
      // Deleting a single followup mode
      const followupMode = await FollowupMode.findByIdAndDelete(id);
      if (!followupMode) {
        return res
          .status(404)
          .json({ message: `Followup Mode with id ${id} not found` });
      }
      return res.json({
        message: `Followup Mode with id ${id} deleted successfully`,
      });
    }
  } catch (error) {
    handleErrors(error, res);
  }
};
