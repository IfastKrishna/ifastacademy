const handleErrors = require("../../../utils/handleErrors");

const addBatch = async (req, res) => {
  try {
    // Destructure required fields from request body
    const {
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

    // Check for existing batch with the same name
    const existingBatch = await Batch.findOne({ name });
    if (existingBatch) {
      return res.status(409).json({ message: "Batch name already exists!" });
    }

    // Create and save new batch
    const newBatch = new Batch({
      name,
      course,
      startDate,
      capacity,
      description,
    });

    if (students.length > 0) {
      newBatch.students = students;
    }

    if (instructors.length > 0) {
      newBatch.instructors = instructors;
    }

    const savedBatch = await newBatch.save();

    res.status(201).json(savedBatch);
  } catch (err) {
    handleErrors(err, res);
  }
};

// Export the addBatch controller
module.exports = addBatch;
