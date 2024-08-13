const { Student } = require("../../models/student/student.models");
const handleErrors = require("../../utils/handleErrors");

const getStudentDetailsById = async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  try {
    const student = await Student.findById(id).populate({
      path: "enrolledBatch",
      select: "name",
      populate: {
        path: "course",
        select: "name",
      },
    });

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
