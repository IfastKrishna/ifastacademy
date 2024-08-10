const { Batch } = require("../../../models/master/batch.models");
const handleErrors = require("../../../utils/handleErrors");

const updateBatch = async (req, res) => {
  const { id } = req.params;
  console.log("CHeck Batch Id Come or :::::::::", id);
  try {
    const {
      name,
      course,
      startDate,
      capacity,
      description,
      students,
      instructors,
      batchTiming,
    } = req.body;

    // Validate required fields
    if (!name || !course || !startDate || !capacity || !batchTiming) {
      return res.status(400).json({ message: "Missing required fields!" });
    }

    // Validate that capacity is a number
    if (typeof capacity !== "number" || capacity <= 0) {
      return res
        .status(400)
        .json({ message: "Capacity must be a positive number!" });
    }

    // Validate that startDate is a valid date
    if (isNaN(Date.parse(startDate))) {
      return res.status(400).json({ message: "Invalid start date!" });
    }

    // Find batch by ID
    const batch = await Batch.findById(id);
    if (!batch) {
      return res.status(404).json({ message: "Batch not found!" });
    }

    // Check for duplicate batch name
    const existingBatch = await Batch.findOne({ name, _id: { $ne: id } });
    if (existingBatch) {
      return res.status(409).json({ message: "Batch name already exists!" });
    }

    // Prepare the update object
    const updateBatch = {
      name,
      course,
      startDate,
      capacity,
      description,
      batchTiming,
    };

    if (Array.isArray(students)) {
      updateBatch.students = students;
    }
    if (Array.isArray(instructors)) {
      updateBatch.instructors = instructors;
    }

    // Save the updated batch
    const updated = await Batch.findByIdAndUpdate(id, updateBatch, {
      new: true,
    });

    return res
      .status(200)
      .json({ data: updated, message: "Batch updated successfully!" });
  } catch (err) {
    handleErrors(err, res);
  }
};

module.exports = updateBatch;
