const BatchAttendance = require("../../models/batch-attendance");
const handleErrors = require("../../utils/handleErrors");

const takeBatchAttendance = async (req, res) => {
  try {
    const {
      batchId,
      date,
      takenBy,
      todayTopic,
      problemFaced,
      studentsAttendance,
      generalRemarks,
    } = req.body;

    if (!batchId || !takenBy || !todayTopic || !studentsAttendance) {
      res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    const attendance = new BatchAttendance({
      batchId,
      takenBy,
      todayTopic,
      problemFaced,
      studentsAttendance,
      generalRemarks,
      date,
    });

    await attendance.save();
    res.status(201).json({ message: "Attendance taken successfully" });
  } catch (err) {
    handleErrors(err, res);
  }
};

module.exports = takeBatchAttendance;
