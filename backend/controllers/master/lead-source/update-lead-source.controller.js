const { LeadSource } = require("../../../models/master/lead-source.models");
const handleErrors = require("../../../utils/handleErrors");

const updateLeadSource = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, connect } = req.body;
    if (!name || !connect) {
      return res
        .status(400)
        .json({ message: "Name or description are required" });
    }
    const leadSource = await LeadSource.findByIdAndUpdate(
      id,
      {
        name,
        description,
        connect,
      },
      { new: true }
    );
    if (!leadSource) {
      return res
        .status(404)
        .json({ message: `Lead Source with id ${id} not found` });
    }
    res
      .status(200)
      .send({ status: true, message: "Lead Source updated successfully" });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = updateLeadSource;
