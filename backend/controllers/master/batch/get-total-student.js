const { Batch } = require("../../../models/master/batch.models");
const { Student } = require("../../../models/student/student.models");
const handleErrors = require("../../../utils/handleErrors");

const getTotalStudentInBatch = async (req, res) => {
  try {
    const { batchId } = req.params;

    if (!batchId) {
      return res.status(400).json({ message: "Please provide batchId" });
    }

    // Find the batch and populate the students array
    const batch = await Student.find({
      enrolledBatch: { $in: [batchId] },
    }).select("firstName lastName ifastId avatar phoneNo");

    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    return res.status(200).json({ success: true, data: batch });
  } catch (err) {
    handleErrors(err, res);
  }
};

module.exports = { getTotalStudentInBatch };
