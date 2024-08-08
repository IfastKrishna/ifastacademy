const FollowupMode = require("../../../models/master/follow-up-mode.models");
const handleErrors = require("../../../utils/handleErrors");

const deleteFollowupMode = async (req, res) => {
  console.log("delte followup mode");
  try {
    const { id } = req.params;

    if (Array.isArray(id)) {
      id = JSON.parse(id);
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

module.exports = deleteFollowupMode;
