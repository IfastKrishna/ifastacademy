const BatchAttendance = require("../../models/batch-attendance");
const handleErrors = require("../../utils/handleErrors");

const updateAttendance = async (req, res) => {
  try {
    let {
      batchId,
      takenBy,
      todayTopic,
      problemFaced,
      studentsAttendance,
      remarks,
    } = req.body;

    studentsAttendance = JSON.parse(studentsAttendance);

    if (!batchId || !todayTopic || !studentsAttendance.length > 0 || !takenBy) {
      res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    const updatedAttendance = await BatchAttendance.findOneAndUpdate(
      { batchId: batchId },
      {
        takenBy: takenBy,
        todayTopic: todayTopic,
        problemFaced: problemFaced,
        studentsAttendance: studentsAttendance,
        remarks: remarks,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Batch attendance updated successfully",
      data: updatedAttendance,
    });
  } catch (error) {
    console.log(error);
    handleErrors(error, res);
  }
};

module.exports = updateBatchAttendance;
