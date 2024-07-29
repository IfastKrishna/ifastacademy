const { Student } = require("../../models/student/student.models");

const updateStudentDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, ...rest } = req.body;
    const student = await Student.findOne({ _id: id });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    const updatedStudent = await Student.findOneAndUpdate(
      { _id: id },
      { name, email, phone, address, ...rest },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Student details updated", data: updatedStudent });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = updateStudentDetails;
