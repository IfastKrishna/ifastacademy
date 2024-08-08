const LeadSourceModal = require("../../../models/master/lead-source.models");
const handleErrors = require("../../../utils/handleErrors");

const getLeadSourcesCount = async (req, res) => {
  try {
    const count = await LeadSourceModal.countDocuments({});
    res.status(200).json({ count });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = getLeadSourcesCount;
