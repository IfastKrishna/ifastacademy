const BatchAttendance = require("../../models/batch-attendance");

const getBatchAttendanceById = async (req, res) => {
  try {
    const batchAttendance = await BatchAttendance.findOne({
      _id: req?.params?._id,
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

module.exports = getBatchAttendanceById;
