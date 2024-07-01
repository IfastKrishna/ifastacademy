const { Course } = require("../../../models/master/course.models");
const handleErrors = require("../../../utils/handleErrors");

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
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

    // Check for required fields
    if (
      [name, duration, level, startDate].some(
        (val) => !val || val === "" || val === null || val === undefined
      )
    ) {
      return res
        .status(400)
        .json({ message: "Name, duration, level, and startDate are required" });
    }

    const updateData = {
      name,
      description,
      duration,
      startDate,
      endDate,
      level,
      requirements,
    };

    // Only update instructor if it's provided and not empty
    if (instructor && instructor.length > 0) {
      updateData.instructor = instructor;
    }

    const course = await Course.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({
      status: true,
      message: "Course updated successfully",
      data: course,
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = updateCourse;
