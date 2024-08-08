const { Batch } = require("../../../models/master/batch.models");
const handleErrors = require("../../../utils/handleErrors");

const updateBatch = async (req, res) => {
  try {
    const {
      id,
      name,
      course,
      startDate,
      capacity,
      description,
      students,
      instructors,
    } = req.body;

    // Validate required fields
    if (!name || !course || !startDate || !capacity || !description) {
      return res.status(400).json({ message: "Missing required fields!" });
    }

    // Find batch by ID
    const batch = await Batch.findById(id);
    if (!batch) {
      return res.status(404).json({ message: "Batch not found!" });
    }

    // Check for existing batch with the same name (excluding the current batch)
    const existingBatch = await Batch.findOne({ name, _id: { $ne: id } });
    if (existingBatch) {
      return res.status(409).json({ message: "Batch name already exists!" });
    }

    // Update batch properties
    batch.name = name;
    batch.course = course;
    batch.startDate = startDate;
    batch.capacity = capacity;
    batch.description = description;

    if (students && students.length > 0) {
      batch.students = students;
    }

    if (instructors && instructors.length > 0) {
      batch.instructors = instructors;
    }

    const updatedBatch = await batch.save();

    res
      .status(200)
      .json({ data: updatedBatch, message: "Batch updated successfully!" });
  } catch (err) {
    handleErrors(err, res);
  }
};

module.exports = updateBatch;
