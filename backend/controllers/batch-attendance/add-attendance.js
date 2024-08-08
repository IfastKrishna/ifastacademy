const BatchAttendance = require("../../models/batch-attendance");
const handleErrors = require("../../utils/handleErrors");

const addBatchAttendance = async (req, res) => {
  try {
    let {
      batchId,
      takenBy,
      todayTopic,
      problemFaced,
      studentsAttendance,
      remarks,
    } = req.body;
    if (!batchId || !todayTopic || !studentsAttendance || !takenBy) {
      res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    const batchAttendance = new BatchAttendance({
      batchId,
      takenBy,
      todayTopic,
      problemFaced,
      students,
      remarks,
    });
    const newBatchAttendance = await batchAttendance.save();
  } catch (error) {
    console.log(error);
    handleErrors(error, res);
  }
};

module.exports = addBatchAttendance;
