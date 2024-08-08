const BatchAttendance = require("../../models/batch-attendance");

const getBatchAttendance = async (req, res) => {
  try {
    const batchAttendance = await BatchAttendance.find({
      batchId: req.params.batchId,
    });
    res.status(200).json({
      message: "Batch attendance fetched successfully",
      data: batchAttendance,
    });
  } catch (error) {
    console.log(error);
    handleErrors(error, res);
  }
};

module.exports = getBatchAttendance;
