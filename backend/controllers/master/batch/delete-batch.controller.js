const { Batch } = require("../../../models/master/batch.models");
const handleErrors = require("../../../utils/handleErrors");

const deleteMultipleBatches = async (req, res) => {
  try {
    const { ids } = req.body; // Expect an array of batch IDs in the request body
    const deletedCount = await Batch.deleteMany({ _id: { $in: ids } });
    res.status(200).json({
      message: `${deletedCount.deletedCount} batches deleted successfully!`,
    });
  } catch (err) {
    handleErrors(err, res);
  }
};

const deleteBatch = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBatch = await Batch.findByIdAndDelete(id);
    if (!deletedBatch) {
      return res.status(404).json({ message: "Batch not found!" });
    }
    res.status(200).json({ message: "Batch deleted successfully!" });
  } catch (err) {
    handleErrors(err, res);
  }
};

module.exports = { deleteMultipleBatches, deleteBatch };
