const { Batch } = require("../../../models/master/batch.models");
const { Employee } = require("../../../models/master/employee.models");
const handleErrors = require("../../../utils/handleErrors");

const getAllBatches = async (req, res) => {
  try {
    let { page = 1, pageSize, search } = req.query;
    // Ensure page and pageSize are numbers
    page = parseInt(page, 10);
    pageSize = pageSize === "all" ? -1 : parseInt(pageSize, 10);

    // Ensure page and pageSize are within valid ranges
    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(pageSize) || pageSize < 1) pageSize = 10;

    const skip = (page - 1) * pageSize;

    const searchCriteria = {};
    let batchIds = [];

    if (req.user.role === "employee") {
      const employee = await Employee.findOne({
        userId: req?.user?._id,
      }).select("batchIds");
      batchIds = employee?.batchIds;
    }

    if (batchIds.length) {
      searchCriteria._id = { $in: batchIds };
    }

    if (search) {
      const regex = new RegExp(search, "i"); // Case-insensitive search
      searchCriteria.$or = [
        { description: regex },
        { name: regex },
        { batchTiming: regex },
      ];
    }

    // Fetch all records if pageSize is -1 (i.e., "all")
    if (pageSize === -1) {
      const batches = await Batch.find(searchCriteria).populate("course");

      return res.status(200).send({
        data: batches,
        count: batches.length,
        message: "Successfully fetched all batches",
      });
    }

    const [batchCount, batches] = await Promise.all([
      Batch.countDocuments(searchCriteria),
      Batch.find(searchCriteria).skip(skip).limit(pageSize).populate("course"),
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
