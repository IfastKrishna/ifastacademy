// const mongoose = require("mongoose");
const StudentFee = require("../../models/student/student-fee");
const { Student } = require("../../models/student/student.models");
const handleErrors = require("../../utils/handleErrors");

const getStudentFeeById = async (req, res) => {
  const { id } = req.params;

  try {
    const batch = Student.findById(id).populate("enrolledBatch");
    const studentFee = await StudentFee.find({
      studentId: id,
    })
      .populate("batchId", "name")
      .populate("collectedBy", "firstName lastName ifastId")
      .populate("paymentType", "name");

    res.status(200).json({
      message: "Student fees fetched successfully",
      data: studentFee,
    });
  } catch (error) {
    console.log(error);
    handleErrors(error, res);
  }
};

module.exports = getStudentFeeById;
