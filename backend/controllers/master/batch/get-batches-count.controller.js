const { Batch } = require("../../../models/master/batch.models");
const handleErrors = require("../../../utils/handleErrors");

const getBatchesCount = async (_, res) => {
  console.log("getBatchesCount ===");
  try {
    const count = await Batch.countDocuments({});
    res.status(200).send({ count });
  } catch (error) {
    console.log("error :", error);
    handleErrors(error, res);
  }
};

module.exports = getBatchesCount;
