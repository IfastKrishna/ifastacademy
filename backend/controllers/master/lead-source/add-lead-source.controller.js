const { LeadSource } = require("../../../models/master/lead-source.models");
const handleErrors = require("../../../utils/handleErrors");

const addLeadSource = async (req, res) => {
  try {
    const { name, description, connect } = req.body;
    if (!name || !connect) {
      return res
        .status(400)
        .json({ message: "Name or description are required" });
    }
    await LeadSource.create({
      name,
      description,
      connect,
    });
    res
      .status(201)
      .send({ status: true, message: "Lead Source added successfully" });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = addLeadSource;
