const { LeadSource } = require("../../../models/master/lead-source.models");

const addLeadSourceBulk = async (req, res) => {
  try {
    const { leadSource } = req.leadSourceArray;
    const leadSources = await LeadSource.insertMany(leadSource);
    res.status(201).json(leadSources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = addLeadSourceBulk;
