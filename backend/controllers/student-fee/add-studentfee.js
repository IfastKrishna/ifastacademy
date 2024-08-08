const StudentFee = require("../../models/student/student-fee");
const handleErrors = require("../../utils/handleErrors");

const addStudentFee = async (req, res) => {
  try {
    const {
      studentId,
      amount,
      month,
      paymentType,
      monthlyFee,
      collectedBy,
      ...others
    } = req.body;
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

    const studentFee = new StudentFee({
      studentId,
      amount,
      month,
      paymentType,
      monthlyFee,
      collectedBy,
      ...others,
    });

    await studentFee.save();

    res.status(201).json({
      message: "Student fee added successfully",
      data: studentFee,
    });
  } catch (error) {
    console.log(error);
    handleErrors(error, res);
  }
};

module.exports = addStudentFee;
