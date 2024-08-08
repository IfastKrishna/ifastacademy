const handleErrors = require("../../utils/handleErrors");

const updateStudentFee = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Check if the ID is provided
    if (!id) {
      return res.status(400).json({ message: "Student fee ID is required" });
    }

    // Check for the required fields in the updates
    const { studentId, amount, month, paymentType, monthlyFee, collectedBy } =
      updates;
    if (
      !studentId ||
      !amount ||
      !month ||
      !paymentType ||
      !monthlyFee ||
      !collectedBy
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    // Validate that the student exists
    const studentExists = await Student.findById(studentId);
    if (!studentExists) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Find the student fee record by ID and update it
    const updatedStudentFee = await StudentFee.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated document
    });

    // Check if the student fee record exists
    if (!updatedStudentFee) {
      return res.status(404).json({ message: "Student fee record not found" });
    }

    // Return the updated student fee record
    res.status(200).json({
      message: "Student fee updated successfully",
      data: updatedStudentFee,
    });
  } catch (error) {
    console.log(error);
    handleErrors(error, res);
  }
};

module.exports = updateStudentFee;
