const { Student } = require("../../models/student.models");

const deleteStudent = async (req, res) => {
  const { id } = req.params;
  const { ids } = req.body; // Assuming the array of ids to delete is passed in the request body

  try {
    if (id) {
      // Single item deletion
      const student = await Student.findByIdAndDelete(id);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.json({ message: "Student deleted successfully" });
    } else if (ids && Array.isArray(ids)) {
      const students = await Student.deleteMany({ _id: { $in: ids } });
      if (students.deletedCount === 0) {
        return res.status(404).json({ message: "Students not found" });
      }
      res.json({ message: "Students deleted successfully" });
    } else {
      return res.status(400).json({ message: "Invalid request" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting student(s)" });
  }
};

module.exports = deleteStudent;
