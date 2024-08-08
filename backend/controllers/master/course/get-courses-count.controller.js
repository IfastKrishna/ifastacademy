const { Course } = require("../../../models/master/course.models");
const handleErrors = require("../../../utils/handleErrors");

const getCoursesCount = async (req, res) => {
  try {
    const count = await Course.countDocuments({});
    res.status(200).json({ count });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = getCoursesCount;
