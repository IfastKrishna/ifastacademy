const StudentFee = require("../../models/student/student-fee");
const handleErrors = require("../../utils/handleErrors");

const getAllStudentFee = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, search = "" } = req.body;
    const skip = (page - 1) * pageSize;
    const limit = pageSize;
    const query = {};
    if (search) {
      query.$or = [
        { month: { $regex: search, $options: "i" } },
        { amount: { $regex: search, $options: "i" } },
        { remarks: { $regex: search, $options: "i" } },
      ];
    }
    const [studentFee, totalStudentFee] = await Promise.all([
      StudentFee.find(query).skip(skip).limit(limit),
      StudentFee.countDocuments(query),
    ]);

    res.status(200).json({
      message: "Student fee fetched successfully",
      data: studentFee,
      count: totalStudentFee,
    });
  } catch (error) {
    console.log(error);
    handleErrors(error, res);
  }
};

module.exports = getAllStudentFee;
