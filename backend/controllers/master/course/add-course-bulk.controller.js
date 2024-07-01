const { Course } = require("../../../models/master/course.models");
const handleErrors = require("../../../utils/handleErrors");

const addCourseBulk = async (req, res) => {
  try {
    const course = req.courseArray;
    const courses = await Course.insertMany(course);
    res.status(201).json({ courses, message: "Courses added successfully" });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = addCourseBulk;
