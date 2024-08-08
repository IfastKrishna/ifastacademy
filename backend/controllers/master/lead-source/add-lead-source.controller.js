const LeadSourceModal = require("../../../models/master/lead-source.models");
const handleErrors = require("../../../utils/handleErrors");

const addLeadSource = async (req, res) => {
  try {
    const { name, description, contact } = req.body;
    if (!name || !contact) {
      return res.status(400).json({ message: "Name or contact are required" });
    }
    await LeadSourceModal.create({
      name,
      description,
      contact,
    });
    res
      .status(201)
      .send({ status: true, message: "Lead Source added successfully" });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = addLeadSource;
