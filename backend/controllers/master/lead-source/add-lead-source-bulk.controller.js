const { LeadSource } = require("../../../models/master/lead-source.models");
const handleErrors = require("../../../utils/handleErrors");

const addLeadSourceBulk = async (req, res) => {
  try {
    const { leadSource } = req.leadSourceArray;
    const leadSources = await LeadSource.insertMany(leadSource);
    res.status(201).json(leadSources);
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = addLeadSourceBulk;
