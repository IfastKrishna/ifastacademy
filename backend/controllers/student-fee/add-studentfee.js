const StudentFee = require("../../models/student/student-fee");
const handleErrors = require("../../utils/handleErrors");

const addStudentFee = async (req, res) => {
  console.log("Add student fee ::: ");
  try {
    const feeDataArray = req.body; // req.body should be an array of fee objects

    // Validate that req.body is an array
    if (!Array.isArray(feeDataArray) || feeDataArray.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid data format or empty array" });
    }

    // Validate required fields in each fee object
    for (const feeData of feeDataArray) {
      const { studentId, amount, month, paymentType, collectedBy } = feeData;
      if (!studentId || !amount || !month || !paymentType || !collectedBy) {
        return res.status(400).json({
          message: "Please provide all the required fields in each fee object",
        });
      }
    }

    // Create and save each StudentFee document
    const studentFees = await Promise.all(
      feeDataArray.map(async (feeData) => {
        const {
          studentId,
          batchId,
          amount,
          month,
          paymentType,
          collectedBy,
          ...others
        } = feeData;
        const studentFee = new StudentFee({
          studentId,
          batchId,
          amount,
          month,
          paymentType,
          collectedBy,
          ...others,
        });

        return studentFee.save();
      })
    );

    res.status(201).json({
      message: "Student fees added successfully",
      data: studentFees,
    });
  } catch (error) {
    console.log(error);
    handleErrors(error, res);
  }
};

module.exports = addStudentFee;
