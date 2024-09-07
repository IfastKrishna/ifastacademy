const { Course } = require("../../../models/master/course/course.models");
const handleErrors = require("../../../utils/handleErrors");

const deleteCourse = async (req, res) => {
  try {
    let { id } = req.params;

    id = JSON.parse(id);

    if (Array.isArray(id)) {
      const result = await Course.deleteMany({ _id: { $in: id } });
      if (!result.deletedCount) {
        return res
          .status(404)
          .json({ message: `Courses with ids ${id} not found` });
      }
      return res
        .status(200)
        .json({ message: `Courses with ids ${id} deleted successfully` });
    } else {
      const course = await Course.findById(id);
      if (!course) {
        return res
          .status(404)
          .json({ message: `Course with id ${id} not found` });
      }
      await Course.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ message: `Course with id ${id} deleted successfully` });
    }
  } catch (error) {
    return handleErrors(error, res);
  }
};

module.exports = deleteCourse;
