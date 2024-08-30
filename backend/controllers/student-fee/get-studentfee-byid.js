// const mongoose = require("mongoose");
const StudentFee = require("../../models/student/student-fee");
const handleErrors = require("../../utils/handleErrors");

const getStudentFeeById = async (req, res) => {
  const { id } = req.params;

  try {
    const studentFee = await StudentFee.find({
      studentId: id,
    })
      .populate({
        path: "batchId",
        select: "name course",
        populate: {
          path: "course",
          select: "name",
        },
      })
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
