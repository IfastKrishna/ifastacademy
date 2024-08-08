const { Batch } = require("../../../models/master/batch.models");

const getBatchById = async (req, res) => {
  try {
    const { id } = req.params;
    const batch = await Batch.findOne({ _id: id });

    if (!batch) {
      res.status(404).send({ success: false, message: "Batch not found" });
    }

    res.status(200).send({
      success: true,
      data: batch,
      message: "Batch fetched successfully",
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = getBatchById;
