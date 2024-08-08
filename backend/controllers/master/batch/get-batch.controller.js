const { Batch } = require("../../../models/master/batch.models");
const handleErrors = require("../../../utils/handleErrors");

const getAllBatches = async (req, res) => {
  try {
    let { page = 1, pageSize = 10, search } = req.query;

    // Ensure page and pageSize are numbers
    page = parseInt(page, 10);
    pageSize = parseInt(pageSize, 10);

    // Ensure page and pageSize are within valid ranges
    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(pageSize) || pageSize < 1) pageSize = 10;

    const skip = (page - 1) * pageSize;

    const searchCriteria = {};
    if (search) {
      const regex = new RegExp(search, "i"); // Case-insensitive search
      searchCriteria.$or = [
        { description: regex },
        { name: regex },
        { batchTiming: regex },
      ];
    }

    // Calculate the total number of batches that match the search criteria
    if (pageSize === -1) {
      const batches = await Batch.find(searchCriteria)
        .populate("course")
        .populate("students")
        .populate("instructors");
      return res.status(200).send({
        data: batches,
        count: batches.length,
        message: "Successfully fetched all batches",
      });
    }

    const [batchCount, batches] = await Promise.all([
      Batch.countDocuments(searchCriteria),
      Batch.find(searchCriteria)
        .skip(skip)
        .limit(pageSize)
        .populate("course")
        .populate("students")
        .populate("instructors"),
    ]);

    res.status(200).send({
      data: batches,
      count: batchCount,
      message: "Successfully fetched all batches",
    });
  } catch (err) {
    handleErrors(err, res);
  }
};

module.exports = getAllBatches;
