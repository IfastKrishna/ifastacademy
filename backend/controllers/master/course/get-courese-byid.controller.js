const { Course } = require("../../../models/master/course/course.models");
const handleErrors = require("../../../utils/handleErrors");

const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    res.status(200).json({
      data: course,
      success: true,
      message: "Course fetched successfully",
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = getCourseById;
