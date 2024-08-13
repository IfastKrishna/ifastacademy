const { Batch } = require("../../../models/master/batch.models");
const handleErrors = require("../../../utils/handleErrors");

const addBatch = async (req, res) => {
  try {
    const {
      name,
      course,
      startDate,
      endDate,
      capacity,
      description,
      batchTiming,
    } = req.body;

    if (!name || !course || !startDate || !capacity || !batchTiming) {
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
      endDate,
      batchTiming,
      capacity,
      description,
    });

    const savedBatch = await newBatch.save();

    res.status(200).json({
      success: true,
      data: savedBatch,
      message: "Batch created successfully!",
    });
  } catch (err) {
    handleErrors(err, res);
  }
};

// Export the addBatch controller
module.exports = addBatch;
