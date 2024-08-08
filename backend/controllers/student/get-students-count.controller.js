const { Student } = require("../../models/student/student.models");
const handleErrors = require("../../utils/handleErrors");

const getStudentsCount = async (req, res) => {
  try {
    const count = await Student.countDocuments({});
    res.status(200).json({ count });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = getStudentsCount;
