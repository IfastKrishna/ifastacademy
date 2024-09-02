const BatchAttendance = require("../../models/batch-attendance");
const handleErrors = require("../../utils/handleErrors");

const getBatchAndDateWiseAttendance = async (req, res) => {
  let { batchId, date } = req.query;
  date = new Date(date);

  console.log("batchId received and date", batchId, date);
  try {
    if (!batchId || !date) {
      return res
        .status(400)
        .json({ message: "Please provide batchId and date" });
    }

    const attendance = await BatchAttendance.findOne({
      batchId,
      date,
    }).populate("takenBy", "firstName lastName ifastId");

    console.log("Raw attendance data:", attendance);

    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    const populatedAttendance = await attendance.populate(
      "studentsAttendance.studentId",
      "ifastId firstName lastName phoneNo"
    );

    // console.log("Populated attendance data:", populatedAttendance);

    res.status(200).json({
      success: true,
      data: populatedAttendance,
      message: "Attendance fetched successfully!",
    });
  } catch (err) {
    handleErrors(err, res);
  }
};

module.exports = getBatchAndDateWiseAttendance;
