const StudentFee = require("../../models/student/student-fee");
const handleErrors = require("../../utils/handleErrors");

const getStudentFeeById = async (req, res) => {
  try {
    const studentFee = await StudentFee.findOne({
      _id: req?.params?._id,
    });

    res.status(200).json({
      message: "Student fee fetched successfully",
      data: studentFee,
    });
  } catch (error) {
    console.log(error);
    handleErrors(error, res);
  }
};

module.exports = getStudentFeeById;
