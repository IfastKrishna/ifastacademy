const { Student } = require("../../models/student/student.models");
const handleErrors = require("../../utils/handleErrors");

const getStudentDetailsById = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }
    res.json({ success: true, data: student });
  } catch (error) {
    handleErrors(error, res);
  }
};
module.exports = getStudentDetailsById;
