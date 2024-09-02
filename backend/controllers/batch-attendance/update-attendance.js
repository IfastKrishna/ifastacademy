const BatchAttendance = require("../../models/batch-attendance");
const handleErrors = require("../../utils/handleErrors");

const updateAndCreateBatchAttendance = async (req, res) => {
  try {
    const {
      batchId,
      date,
      takenBy,
      todayTopic,
      problemFaced,
      attendance,
      generalRemarks,
    } = req.body;

    // Check for required fields
    if (!batchId || !takenBy || !todayTopic || !attendance || !date) {
      return res.status(400).json({
        message: "Please provide all the required fields.",
      });
    }

    // Parse the date and set time to midnight
    const parsedDate = new Date(date);

    // Construct attendance data
    const attendanceData = {
      batchId,
      takenBy,
      todayTopic,
      problemFaced,
      studentsAttendance: attendance,
      generalRemarks,
      date: parsedDate,
    };

    // Upsert the attendance data
    const attendanceSave = await BatchAttendance.findOneAndUpdate(
      { batchId, date: parsedDate },
      attendanceData,
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    // Send success response
    return res.status(200).json({
      message: "Attendance updated successfully",
      data: attendanceSave,
    });
  } catch (err) {
    handleErrors(err, res);
  }
};

module.exports = updateAndCreateBatchAttendance;
