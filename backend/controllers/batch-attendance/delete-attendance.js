const BatchAttendance = require("../../models/batch-attendance");
const handleErrors = require("../../utils/handleErrors");

const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAttendance = await BatchAttendance.findByIdAndDelete(id);

    if (!deletedAttendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    res.status(200).json({ message: "Attendance record deleted successfully" });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = deleteAttendance;
