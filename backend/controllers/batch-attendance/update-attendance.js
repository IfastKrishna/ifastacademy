const BatchAttendance = require("../../models/batch-attendance");
const handleErrors = require("../../utils/handleErrors");

const updateBatchAttendance = async (req, res) => {
  const { batchId, date } = req.params;

  try {
    const {
      takenBy,
      todayTopic,
      problemFaced,
      studentsAttendance,
      generalRemarks,
    } = req.body;

    if (!batchId || !takenBy || !todayTopic || !studentsAttendance || !date) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields." });
    }

    const parsedDate = new Date(date).setHours(0, 0, 0, 0);

    const attendance = {
      batchId,
      takenBy,
      todayTopic,
      problemFaced,
      studentsAttendance,
      generalRemarks,
      date: parsedDate,
    };

    const updatedAttendance = await BatchAttendance.findOneAndUpdate(
      { batchId, date: parsedDate },
      attendance,
      { new: true, upsert: true }
    );

    if (!updatedAttendance) {
      return res.status(404).json({ message: "Attendance record not found." });
    }

    return res.status(200).json({
      message: "Attendance updated successfully",
      data: updatedAttendance,
    });
  } catch (err) {
    handleErrors(err, res);
  }
};

module.exports = updateBatchAttendance;
