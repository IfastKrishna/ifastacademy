const { Course } = require("../../../models/master/course.models");

const addCourseBulk = async (req, res) => {
  try {
    const course = req.courseArray;
    const courses = await Course.insertMany(course);
    res.status(201).json({ courses, message: "Courses added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = addCourseBulk;
