const LeadSourceModal = require("../../../models/master/lead-source.models");

const addLeadSourceBulk = async (req, res) => {
  try {
    const { leadSource } = req.leadSourceArray;
    const leadSources = await LeadSourceModal.insertMany(leadSource);
    res.status(201).json(leadSources);
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = addLeadSourceBulk;
