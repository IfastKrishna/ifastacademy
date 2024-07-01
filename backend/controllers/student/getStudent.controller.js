const { Student } = require("../../models/student.models");
const handleErrors = require("../../utils/handleErrors");

const getStudent = async (req, res) => {
  try {
    const { pageSize, currPage } = req.query;
    const limit = parseInt(pageSize) || 10;
    const page = parseInt(currPage) || 1;
    const skip = (page - 1) * limit;
    const students = await Student.find().limit(limit).skip(skip);

    res.json({ success: true, data: students });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = getStudent;
