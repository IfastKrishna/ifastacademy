const BatchAttendance = require("../../models/batch-attendance");
const handleErrors = require("../../utils/handleErrors");

// Get total present and absent students in the entire institute on a specific date
const getTotalAttendanceByDate = async (req, res) => {
  const { date } = req.params;

  try {
    const startOfDay = new Date(date).setHours(0, 0, 0, 0);
    const endOfDay = new Date(date).setHours(23, 59, 59, 999);

    const attendanceRecords = await BatchAttendance.find({
      date: { $gte: startOfDay, $lt: endOfDay },
    });

    if (attendanceRecords.length === 0) {
      return res
        .status(404)
        .json({ message: "No attendance records found for this date" });
    }

    let totalPresentStudents = 0;
    let totalAbsentStudents = 0;

    attendanceRecords.forEach((record) => {
      record.studentsAttendance.forEach((student) => {
        if (student.status === "present") {
          totalPresentStudents++;
        } else if (student.status === "absent") {
          totalAbsentStudents++;
        }
      });
    });

    return res.status(200).json({
      date,
      data: { totalPresentStudents, totalAbsentStudents },
      message: "Attendance data fetched successfully",
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = getTotalAttendanceByDate;
