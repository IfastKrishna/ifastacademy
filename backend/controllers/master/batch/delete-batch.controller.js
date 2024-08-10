const { Batch } = require("../../../models/master/batch.models");
const handleErrors = require("../../../utils/handleErrors");

const deleteBatches = async (req, res) => {
  try {
    let { id } = req.params;
    id = JSON.parse(id);
    const deletedCount = await Batch.deleteMany({ _id: { $in: id } });
    res.status(200).json({
      success: true,
      message: `${deletedCount.deletedCount} batches deleted successfully!`,
    });
  } catch (err) {
    handleErrors(err, res);
  }
};

module.exports = deleteBatches;
