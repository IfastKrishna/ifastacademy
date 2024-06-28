const { Course } = require("../../../models/master/course.models");

const addCourse = async (req, res) => {
  try {
    const {
      name,
      description,
      duration,
      startDate,
      endDate,
      level,
      requirements,
      instructor,
    } = req.body;

    if (
      [name, duration, level, startDate].some(
        (val) => !val || val === "" || val === null || val === undefined
      )
    ) {
      return res
        .status(400)
        .json({ message: "Name, duration, level, and startDate are required" });
    }

    const course = new Course({
      name,
      description,
      duration,
      startDate,
      endDate,
      level,
      requirements,
      instructor: instructor.length > 0 ? instructor : undefined,
    });

    await course.save();

    res
      .status(201)
      .json({ status: true, message: "Course added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = addCourse;
